/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AnalyzerService } from './analyzer.service';
import {
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(() => {
    service = new AnalyzerService();
  });

  describe('validation errors', () => {
    it('throws NotAcceptableException when text is empty or whitespace', () => {
      try {
        service.analyze('   ');
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(NotAcceptableException);
        expect((e as Error).message).toContain('Empty text is not allowed');
      }
    });

    it('throws NotAcceptableException when text is longer than 5000 chars', () => {
      const long = 'a'.repeat(5001);
      try {
        service.analyze(long);
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(NotAcceptableException);
        expect((e as Error).message).toContain('Text too long');
      }
    });

    it('throws NotAcceptableException when userId is provided but empty string', () => {
      try {
        service.analyze('hello', '');
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(NotAcceptableException);
        expect((e as Error).message).toContain('Invalid userId');
      }
    });

    it('throws UnprocessableEntityException when no valid tokens are found', () => {
      try {
        service.analyze('!!!'); // after cleanup -> no tokens
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect((e as Error).message).toContain('No valid tokens found');
      }
    });
  });

  describe('scoring and labels', () => {
    it('returns positive result for a single positive token', () => {
      const res = service.analyze('adorei');
      expect(res.rawScore).toBe(1);
      expect(res.normalizedScore).toBe(0.5);
      expect(res.label).toBe('positive');
      expect(res.followers).toBe(0);
    });

    it('applies intensifier (previous token) to increase intensity', () => {
      const res = service.analyze('very adorei');
      expect(res.rawScore).toBeCloseTo(1 * 1.5);
      expect(res.normalizedScore).toBeCloseTo((1 * 1.5) / 2);
      expect(res.label).toBe('positive');
    });

    it('applies negation (within previous two tokens) to invert polarity', () => {
      const res = service.analyze('not adorei');
      expect(res.rawScore).toBe(-1);
      expect(res.normalizedScore).toBe(-0.5);
      expect(res.label).toBe('negative');
    });

    it('combines negation and intensifier correctly', () => {
      const res = service.analyze('not very adorei');
      expect(res.rawScore).toBeCloseTo(-1 * 1.5);
      expect(res.normalizedScore).toBeCloseTo((-1 * 1.5) / 2);
      expect(res.label).toBe('negative');
    });

    it('returns neutral when no known lexicon tokens appear (rawScore 0)', () => {
      const res = service.analyze('hello there');
      expect(res.rawScore).toBe(0);
      expect(res.normalizedScore).toBe(0);
      expect(res.label).toBe('neutral');
    });
  });

  describe('mbras multiplier and followers', () => {
    it('applies mbras multiplier when "mbras" is present in text', () => {
      const res = service.analyze('mbras adorei');
      expect(res.rawScore).toBe(2); // base 1 * multiplier 2
      expect(res.normalizedScore).toBe(1);
      expect(res.label).toBe('positive');
    });

    it('applies mbras multiplier when "mbras" is present in userId', () => {
      const res = service.analyze('adorei', 'user-mbras');
      expect(res.rawScore).toBe(2); // base 1 * multiplier 2
      expect(res.normalizedScore).toBe(1);
      expect(res.label).toBe('positive');
      expect(typeof res.followers).toBe('number');
      expect(res.followers).toBeGreaterThanOrEqual(100);
      expect(res.followers).toBeLessThanOrEqual(10100);
    });

    it('followers are deterministic and stable for same userId', () => {
      const a = service.analyze('adorei', 'user-abc').followers;
      const b = service.analyze('adorei', 'user-abc').followers;
      expect(a).toBe(b);
      expect(a).toBeGreaterThanOrEqual(100);
      expect(a).toBeLessThanOrEqual(10100);
    });

    it('deterministicFollowers throws when given non-string (private method access)', () => {
      // call private method via any to assert the internal guard

      expect(() => (service as any).deterministicFollowers(123)).toThrow(
        'userId must be string',
      );
    });
  });
});

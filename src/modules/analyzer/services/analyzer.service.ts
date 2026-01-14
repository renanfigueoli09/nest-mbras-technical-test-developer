import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class AnalyzerService {
  private intensifiers = new Set([
    'very',
    'really',
    'super',
    'muito',
    'superadorei',
    'extremely',
    'bem',
    'muito',
  ]);
  private negations = new Set(['not', "n't", 'não', 'never', 'nunca']);
  private lexicon: Record<string, number> = {
    adorei: 1,
    gostei: 1,
    amo: 2,
    hate: -1,
    odiei: -1,
    ruim: -1,
    bom: 1,
    ótimo: 1,
    péssimo: -2,
  };

  analyze(text: string, userId?: string) {
    if (!text.trim()) {
      throw new NotAcceptableException('Empty text is not allowed');
    }

    if (text.length > 5000) {
      throw new NotAcceptableException('Text too long');
    }

    if (userId && userId.length === 0) {
      throw new NotAcceptableException('Invalid userId');
    }

    const normalizedText = text.normalize('NFKD');
    const tokens = normalizedText
      .toLowerCase()
      .replace(/[^\p{L}\d\s]/gu, ' ')
      .split(/\s+/)
      .filter(Boolean);

    if (tokens.length === 0) {
      throw new UnprocessableEntityException('No valid tokens found');
    }

    let rawScore = 0;

    const mbrasFlag = /mbras/i.test(text) || (userId && /mbras/i.test(userId));
    const mbrasMultiplier = mbrasFlag ? 2 : 1;

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (this.lexicon[t]) {
        let base = this.lexicon[t];

        let intensity = 1;
        if (i > 0 && this.intensifiers.has(tokens[i - 1])) {
          intensity = 1.5;
        }

        let negated = false;
        for (let j = Math.max(0, i - 2); j < i; j++) {
          if (this.negations.has(tokens[j])) {
            negated = true;
            break;
          }
        }

        if (negated) base = -base;

        rawScore += base * intensity * mbrasMultiplier;
      }
    }

    const normalizedScore = rawScore / 2;

    const label =
      normalizedScore > 0.1
        ? 'positive'
        : normalizedScore < -0.1
          ? 'negative'
          : 'neutral';

    const followers = userId ? this.deterministicFollowers(userId) : 0;

    return {
      rawScore,
      normalizedScore,
      label,
      followers,
    };
  }
  private deterministicFollowers(userId: string): number {
    if (typeof userId !== 'string') throw new Error('userId must be string');
    const normalized = userId.normalize('NFKD');
    const hex = createHash('sha256').update(normalized, 'utf8').digest('hex');
    const val = BigInt('0x' + hex) % BigInt(10000);
    return Number(val) + 100;
  }
}

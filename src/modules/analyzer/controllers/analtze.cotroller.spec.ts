/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AnalyzerController } from './analyzer.controller';
import { AnalyzeDto } from '../dto/analyze.dto';

describe('AnalyzerController', () => {
  let controller: AnalyzerController;
  let analyzerService: { analyze: jest.Mock };

  beforeEach(() => {
    analyzerService = { analyze: jest.fn() };
    controller = new AnalyzerController(analyzerService as any);
  });

  describe('constructor', () => {
    it('should be defined and have analyzer service injected', () => {
      expect(controller).toBeDefined();
      expect((controller as any).analyzer).toBe(analyzerService);
    });
  });

  describe('analyze', () => {
    it('should call analyzer.analyze with text and userId and return the result', async () => {
      const dto: AnalyzeDto = { text: 'hello', userId: 'user-1' } as AnalyzeDto;
      analyzerService.analyze.mockResolvedValue({ score: 1 });
      await expect(controller.analyze(dto)).resolves.toEqual({ score: 1 });
      expect(analyzerService.analyze).toHaveBeenCalledWith('hello', 'user-1');
      expect(analyzerService.analyze).toHaveBeenCalledTimes(1);
    });

    it('should propagate errors from analyzer.analyze', async () => {
      const dto: AnalyzeDto = { text: 'bye', userId: 'user-2' } as AnalyzeDto;
      analyzerService.analyze.mockRejectedValue(new Error('fail'));
      await expect(controller.analyze(dto)).rejects.toThrow('fail');
      expect(analyzerService.analyze).toHaveBeenCalledWith('bye', 'user-2');
    });
  });
});

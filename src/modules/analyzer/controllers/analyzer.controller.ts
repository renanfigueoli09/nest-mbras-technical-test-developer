import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzerService } from '../services/analyzer.service';
import { AnalyzeDto } from '../dto/analyze.dto';

@Controller('analyze')
export class AnalyzerController {
  constructor(private readonly analyzer: AnalyzerService) {}

  @Post()
  analyze(@Body() body: AnalyzeDto) {
    return this.analyzer.analyze(body.text, body.userId);
  }
}

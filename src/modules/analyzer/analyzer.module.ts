import { Module } from '@nestjs/common';
import { AnalyzerService } from './services/analyzer.service';
import { AnalyzerController } from './controllers/analyzer.controller';

@Module({
  controllers: [AnalyzerController],
  providers: [AnalyzerService],
})
export class AnalyzerModule {}

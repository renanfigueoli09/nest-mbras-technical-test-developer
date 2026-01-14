import { HealthCheckModule } from '@healthcheck/health-check.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyzerModule } from '@analyzer/analyzer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HealthCheckModule,
    AnalyzerModule,
  ],
})
export class AppModule {}

import { HealthCheckResponseDto } from '@healthcheck/dto/health-check-response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  private formatUptime(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  getHealth(): HealthCheckResponseDto {
    const uptimeSeconds: number = process.uptime();
    return {
      status: 'ok',
      uptime: this.formatUptime(uptimeSeconds),
      timestamp: new Date().toISOString(),
    };
  }
}

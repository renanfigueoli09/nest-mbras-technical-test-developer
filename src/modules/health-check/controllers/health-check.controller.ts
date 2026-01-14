import { HealthCheckResponseDto } from '@healthcheck/dto/health-check-response.dto';
import { HealthCheckService } from '@healthcheck/services/health-check.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiOkResponse({ type: HealthCheckResponseDto })
  getHealth(): HealthCheckResponseDto {
    return this.healthCheckService.getHealth();
  }
}

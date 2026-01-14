import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: '0h 1m 23s' })
  uptime: string;

  @ApiProperty({ example: '2024-06-20T12:34:56.000Z' })
  timestamp: string;
}

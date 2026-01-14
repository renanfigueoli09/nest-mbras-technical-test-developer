import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';
import { HealthCheckResponseDto } from '@healthcheck/dto/health-check-response.dto';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health check object with correct structure', () => {
    const result: HealthCheckResponseDto = service.getHealth();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('uptime');
    expect(result).toHaveProperty('timestamp');
    expect(typeof result.uptime).toBe('string');
    expect(typeof result.timestamp).toBe('string');
  });

  it('should format uptime as "0h 0m 0s" for 0 seconds', () => {
    expect(service['formatUptime'](0)).toBe('0h 0m 0s');
    expect(service['formatUptime'](3661)).toBe('1h 1m 1s');
  });
});

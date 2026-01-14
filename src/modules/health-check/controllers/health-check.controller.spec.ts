import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from '../services/health-check.service';
import { HealthCheckResponseDto } from '@healthcheck/dto/health-check-response.dto';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  const mockResponse: HealthCheckResponseDto = {
    status: 'ok',
    uptime: '1h 2m 3s',
    timestamp: '2025-08-20T12:34:56.000Z',
  };

  const mockService = {
    getHealth: jest.fn().mockReturnValue(mockResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check response from service', () => {
    const result = controller.getHealth();
    expect(result).toEqual(mockResponse);
    expect(mockService.getHealth).toHaveBeenCalled();
  });
});

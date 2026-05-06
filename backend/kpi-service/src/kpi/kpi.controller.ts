import { Controller, Get } from '@nestjs/common';
import { KPIService } from './kpi.service';

@Controller('api/kpi')
export class KPIController {
  constructor(private readonly kpiService: KPIService) {}

  @Get()
  async getKPI() {
    return this.kpiService.getKPI();
  }
}
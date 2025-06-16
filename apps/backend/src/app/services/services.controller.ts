import { Controller, Get, Query, SetMetadata } from '@nestjs/common';
import { Public } from '@public-services-platform/auth';

@Controller('services')
export class ServicesController {
  @Get()
  @SetMetadata('roles', ['citoyen'])
  getServices(@Query('category') category?: string) {
    let services = [{ id: 1, name: 'Service 1', description: 'Public service', category: 'health' }];
    if (category) {
      services = services.filter(s => s.category === category);
    }
    return services;
  }

  @Get('admin')
  @SetMetadata('roles', ['admin'])
  getAdminServices() {
    return [{ id: 2, name: 'Admin Service', description: 'Admin-only service' }];
  }

  @Get('public')
  @Public()
  getPublicServices() {
    return [{ id: 3, name: 'Public Service', description: 'No auth required' }];
  }
}
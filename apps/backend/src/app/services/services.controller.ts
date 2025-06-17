import { Controller, Get, Post, Put, Delete, Body, Param, Query, SetMetadata, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { KeycloakAuthGuard, Public, RolesGuard } from '@public-services-platform/auth';
import { Service } from '../../../../../libs/models/src/lib/service.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('services')
//@UseGuards(AuthGuard('jwt'), KeycloakAuthGuard, RolesGuard)
export class ServicesController {
  private services: Service[] = [
    { id: 1, name: 'Service 1', description: 'Public service', category: 'health', active: true },
    { id: 2, name: 'Admin Service', description: 'Admin-only service', category: 'admin', active: true },
    { id: 3, name: 'Public Service', description: 'No auth required', category: 'general', active: false },
  ];

  private nextId = 4;

@Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuth(@Req() req) {
    console.log('Authenticated Request:', req.user); // Ensure this logs
    return { message: 'Success', user: req.user };
  }
  @Get()
  @SetMetadata('roles', ['citoyen'])
  getServices(@Query('category') category?: string) {
    let filtered = this.services.filter(s => s.category !== 'admin'); // Exclude admin services here if needed
    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }
    return filtered;
  }

  @Get('admin')
  @SetMetadata('roles', ['admin'])
  getAdminServices() {
    return this.services.filter(s => s.category === 'admin');
  }

  @Get('public')
  @Public()
  getPublicServices() {
    return this.services.filter(s => s.category === 'general');
  }
 @Get('all')
  @Public()
  getALLservices() {
    return this.services;
  }
    // CRUD methods

  @Post()
  //@SetMetadata('roles', ['admin', 'citoyen','agent'])
  createService(@Body() serviceData: Partial<Service>): Service {
    const newService: Service = {
      id: this.nextId++,
      name: serviceData.name || 'Unnamed Service',
      description: serviceData.description || '',
      category: serviceData.category || 'general',
      active: serviceData.active ?? false,
    };
    this.services.push(newService);
    return newService;
  }

  @Put(':id')
  //@SetMetadata('roles', ['admin', 'citoyen'])
  updateService(@Param('id') id: string, @Body() serviceData: Partial<Service>): Service {
    const serviceId = Number(id);
    const service = this.services.find(s => s.id === serviceId);
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    Object.assign(service, serviceData);
    return service;
  }

  @Delete(':id')
  // @SetMetadata('roles', ['admin', 'citoyen'])
  deleteService(@Param('id') id: string): { message: string } {
    const serviceId = Number(id);
    const index = this.services.findIndex(s => s.id === serviceId);
    if (index === -1) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    this.services.splice(index, 1);
    return { message: `Service with id ${id} deleted` };
  }
}

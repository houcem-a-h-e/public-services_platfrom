import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from '@public-services-platform/models';
import { CreateServiceDto } from '../dto/create-service.dto';

@Injectable()
export class ServicesService {
  private services: Service[] = [];
  private idCounter = 1;

  findAll(): Service[] {
    return this.services;
  }

  findOne(id: number): Service {
    const service = this.services.find(s => s.id === id);
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  create(createDto: CreateServiceDto): Service {
    const newService: Service = {
      id: this.idCounter++,
      name: createDto.name,
      description: createDto.description || '',
      active: createDto.active ?? true,
    };
    this.services.push(newService);
    return newService;
  }

  update(id: number, updateDto: CreateServiceDto): Service {
    const service = this.findOne(id);
    service.name = updateDto.name ?? service.name;
    service.description = updateDto.description ?? service.description;
    service.active = updateDto.active ?? service.active;
    return service;
  }

  remove(id: number): void {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) throw new NotFoundException('Service not found');
    this.services.splice(index, 1);
  }
}
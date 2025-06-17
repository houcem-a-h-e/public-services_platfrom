import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from '../dto/create-service.dto'
import { Service } from '@public-services-platform/models';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(): Service[] {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Service {
    return this.servicesService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateServiceDto): Service {
    return this.servicesService.create(createDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: CreateServiceDto): Service {
    return this.servicesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.servicesService.remove(id);
  }
}

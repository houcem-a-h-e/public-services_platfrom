import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
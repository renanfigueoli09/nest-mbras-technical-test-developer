import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class AnalyzeDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

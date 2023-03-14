import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserToken {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  routeId: number;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  invoke: number;
}

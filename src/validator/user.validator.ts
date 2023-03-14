import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Prisma, Type } from '@prisma/client';

export class User {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  token: number;

  // @IsString()
  @IsEnum(Type)
  type: Type;
}

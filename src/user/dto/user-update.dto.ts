import { IsEmail, IsString } from "class-validator"

export class UpdateUserDto {
  @IsEmail()
  email: string

  username?: string

  description?: string;

  firstname?: string

  lastname?: string

  country?: string

  city?: string

  address?: string

  age?: number

  currency?: string

  sex?: string

  avatar?: string

  phone_number?: string

  password?: string

  jsonSettings?: JsonSettingsDto
}

export class JsonSettingsDto {
  theme?: string;

  isFirstVisit?: boolean;

  isProductPageWasOpened?: boolean;
}
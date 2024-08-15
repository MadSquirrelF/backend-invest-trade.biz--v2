import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegisterDto {
  @MinLength(3, {
    message: 'Email cannot be less than 3 characters!'
  })
  @IsEmail()
  email: string

  @MinLength(3, {
    message: 'Username cannot be less than 6 characters!'
  })
  @IsString()
  username: string

  @MinLength(6, {
    message: 'Password cannot be less than 6 characters!'
  })
  @IsString()
  password: string

  @MinLength(3, {
    message: 'Firstname cannot be less than 3 characters!'
  })
  @IsString()
  firstname: string

  @MinLength(3, {
    message: 'Firstname cannot be less than 3 characters!'
  })
  @IsString()
  lastname: string

  @IsNotEmpty({
    message: 'reCaptcha token can not be empty'
  })
  @IsString()
  token: string;

  @IsString()
  phone_number: string;
}

export class LoginDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password cannot be less than 6 characters!'
  })
  @IsString()
  password: string

  
  // @IsNotEmpty({
  //   message: 'reCaptcha token can not be empty'
  // })
  // @IsString()
  // token: string;
}
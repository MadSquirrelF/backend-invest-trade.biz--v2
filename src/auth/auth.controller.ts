import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly AuthService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthService.getNewTokens(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return this.AuthService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/registration')
  async register(@Body() dto: RegisterDto) {
    return this.AuthService.register(dto)
  }
}

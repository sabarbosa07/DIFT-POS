import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')  
  @UseGuards(JwtGuardGuard)
  handleRegister(@Body() registerAuthDto: RegisterAuthDto){
    return this.authService.create(registerAuthDto);
  }

  @Post('login')
  handleLogin(@Body() loginDto: LoginAuthDto){
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(JwtGuardGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuardGuard)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  
  @Patch(':id')
  @UseGuards(JwtGuardGuard)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }  

}

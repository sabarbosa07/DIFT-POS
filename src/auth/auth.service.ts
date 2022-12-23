import { ConflictException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { usersAuth } from './entities/usersAuth.entity';
import { compareHash, generateHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async create(registerAuthDto: RegisterAuthDto): Promise<usersAuth> {

    if (await this.prisma.users.findFirst({
      where: { documenttypeid: registerAuthDto.documenttypeid, documentnumber: registerAuthDto.documentnumber }
    }).then(res => Boolean(res))
    ) {
      throw new ConflictException("Ya existe un usuario con los datos ingresados");
    }
    else {
      const user = await this.prisma.users.create({
        data:
        {
          documenttypeid: registerAuthDto.documenttypeid,
          documentnumber: registerAuthDto.documentnumber,
          firstname: registerAuthDto.firstname,
          secondname: registerAuthDto.secondname,
          firstlastname: registerAuthDto.firstlastname,
          secondlastname: registerAuthDto.secondlastname,
          loginname: registerAuthDto.loginname,
          password: await generateHash(registerAuthDto.password),
          email: registerAuthDto.email,
          status: registerAuthDto.status,
          usercreate: registerAuthDto.usercreate
        }
      });
      return JSON.parse(JSON.stringify(user, (_, v) => typeof v === 'bigint' ? v.toString() : v));
    }
  }

  async login(loginDto: LoginAuthDto) {    
    const userExist = await this.prisma.users.findFirst({ where: { loginname: loginDto.loginname } });
    if(!userExist){
      throw new HttpException('Usuario y/o contraseña incorrecta', HttpStatus.CONFLICT);
    }

    const isCheckUser = await compareHash(loginDto.password, userExist.password);
    if(!isCheckUser){
      throw new HttpException('Usuario y/o contraseña incorrecta', HttpStatus.CONFLICT);
    }
    delete userExist.password;

    const payload = {
      id: userExist.id,
      loginName: userExist.loginname,
      email: userExist.email
    };

    const token = this.jwtService.sign(payload);
    const data = {
      token,
      user: userExist
    }

    return JSON.parse(JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v));
  }

  async findAll(): Promise<usersAuth[]> {
    const user = await this.prisma.users.findMany();
    return JSON.parse(JSON.stringify(user, (_, v) => typeof v === 'bigint' ? v.toString() : v));
  }

  async findOne(id: string): Promise<usersAuth | null> {    
    const user = await this.prisma.users.findUnique({ where: { id: id } });
    return JSON.parse(JSON.stringify(user, (_, v) => typeof v === 'bigint' ? v.toString() : v));
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<usersAuth> {
    return await this.prisma.users.update({
      where: { id: id },
      data: { 
              documentnumber: updateAuthDto.documentnumber,
              firstname: updateAuthDto.firstname,
              secondname: updateAuthDto.secondname,
              firstlastname: updateAuthDto.firstlastname,
              secondlastname: updateAuthDto.secondlastname,
              loginname: updateAuthDto.loginname,
              password: updateAuthDto.password,
              email: updateAuthDto.email,
              status: updateAuthDto.status,
              dateupdate: new Date(), 
              userupdate: updateAuthDto.userupdate 
            },
    });
  }
}

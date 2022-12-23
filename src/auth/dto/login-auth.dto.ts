import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    loginname: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

}
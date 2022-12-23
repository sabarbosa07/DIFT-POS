import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateAuthDto {

    id: string;
    @ApiProperty()
    @IsNotEmpty()

    @ApiProperty()
    @IsNotEmpty()
    documenttypeid: bigint;

    @ApiProperty()
    @IsNotEmpty()
    documentnumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    firstname: string;

    @ApiProperty()
    secondname?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    firstlastname: string;

    @ApiProperty()
    secondlastname?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    loginname: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    status: boolean;

    @ApiProperty()
    @IsNotEmpty()
    userupdate: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    categoryname: string;

    @ApiProperty()
    @IsNotEmpty()
    status: boolean;

    @ApiProperty()
    @IsNotEmpty()
    usercreate: string;
}

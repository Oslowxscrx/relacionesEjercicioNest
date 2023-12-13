import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUsuarioDto {

    @IsString({each: true})
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsOptional()
    age: number

    @IsString({each: true})
    @IsNotEmpty()
    urlPhoto: string[]
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @ApiProperty({
        description: 'Enter the fullName of the user',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        description: 'enter the email of the user',
        example: 'john@example.com',
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Enter the Password',
        example: 'secure',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}

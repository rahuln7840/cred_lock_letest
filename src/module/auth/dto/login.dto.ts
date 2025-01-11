import { emailRegExp } from '@common/types/reg.exp.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class loginDto {
    @ApiProperty({
        description: 'enter the email of the user',
        example: 'testuser@example.com',
        required: true,
    })
    @Matches(emailRegExp, {
        message: "'Email' must be a valid E-Mail Format.",
    })
    @IsNotEmpty({ message: 'email cannot be empty!' })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Enter the Password',
        example: 'secure',
        required: true,
    })
    @IsNotEmpty({ message: 'password field` cannot be empty!' })
    @IsString()
    password: string;
}

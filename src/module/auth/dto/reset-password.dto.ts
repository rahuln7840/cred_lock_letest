import { emailRegExp } from '@common/types/reg.exp.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Enter the email',
        example: 'example12@gmail.com',
        required: true,
    })
    @Matches(emailRegExp, {
        message: "'Email' must be a valid E-Mail Format.",
    })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

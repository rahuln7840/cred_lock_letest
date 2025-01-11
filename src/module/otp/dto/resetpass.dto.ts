import { emailRegExp } from '@common/types/reg.exp.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Enter the new password',
        example: 'newPassword',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    public password: string;

    @ApiProperty({
        description: 'Enter the email',
        example: 'example@gmail.com',
        required: true,
    })
    @Matches(emailRegExp, {
        message: "'Email' must be a valid E-Mail Format.",
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}

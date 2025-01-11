import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class VerifyDto{
    
    @ApiProperty({
        description: 'Enter the email',
        example: 'example12@gmail.com',
        required: true,
      })
    @IsEmail()
    public email: string;
    
  
    @ApiProperty()
    @IsString()
    public otp: string

}
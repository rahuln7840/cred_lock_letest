import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { OtpDto } from './dto/otp';
import { VerifyDto } from './dto/verify.dto';
import { ApiError } from '@common/helper/error_description';
import { ResetPasswordDto } from './dto/resetpass.dto';

@ApiTags('Otp')
@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @Post('generate')
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    async generateOTP(@Body() dto: OtpDto) {
        return await this.otpService.generateOTP(dto);
    }

    @Post('verify')
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'for reset password',
        description: 'Endpoint to verify OTP and perform user login.',
    })
    async verifyOTP(@Body() dto: VerifyDto) {
        return await this.otpService.verifyOTP(dto);
    }

    @Post('reset-password')
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return await this.otpService.updatePassword(dto);
    }
}

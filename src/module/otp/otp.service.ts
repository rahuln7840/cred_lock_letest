import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OtpDto } from './dto/otp';
import { VerifyDto } from './dto/verify.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResetPasswordDto } from './dto/resetpass.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OtpService {
    constructor(private prismaService: PrismaService) {}

    async generateOTP(dto: OtpDto) {
        const user = await this.prismaService.user.findFirst({
            where: { email: dto.email },
        });
        if (!user) {
            throw new BadRequestException('Invalid email');
        }

        const getRandomInt = () => Math.floor(Math.random() * 10);

        const otp = Array.from({ length: 6 }, getRandomInt).join('');

        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.prismaService.userotp.upsert({
            where: { user_id: user.id },
            update: { otp, otp_expires_at: otpExpiresAt },
            create: { otp, otp_expires_at: otpExpiresAt, user_id: user.id },
        });

        await this.sendOTPEmail(dto.email, otp).catch((e) => {
            throw new BadRequestException(
                'Unable to send OTP email. The email might be on a block list or there could be another issue.',
                e.message,
            );
        });

        return {
            message: 'OTP sent successfully',
            otp,
        };
    }
    async verifyOTP(dto: VerifyDto) {
        const { email, otp } = dto;
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException('Invalid email');
        }

        const otpRecord = await this.prismaService.userotp.findFirst({
            where: { user_id: user.id },
        });

        if (!otpRecord) {
            throw new NotFoundException('OTP IS NOT FOUND');
        }
        if (otpRecord.otp !== otp) {
            throw new BadRequestException('Invalid OTP.');
        }

        return { message: 'OTP verified successfully.' };
    }

    async updatePassword(dto: ResetPasswordDto) {
        const { password, email } = dto;

        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new NotFoundException('Invalid email');
        }

        const newPassword = await this.hashPassword(password);

        const result = await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: newPassword },
        });
        if (!result) {
            throw new BadRequestException('Error while changing password');
        }
        return { message: 'Password change' };
    }

    private async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    private async sendOTPEmail(email: string, otp: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`,
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to send OTP email.');
        }
    }
}

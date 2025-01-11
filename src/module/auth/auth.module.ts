import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../prisma/prisma.module';
import { utils } from '@common/helper/utils';
import { JwtStrategy } from '@common/strategy/jwt.strategy';
import { AppConfigModule } from '@common/config/config.module';

@Module({
    imports: [
        AppConfigModule,
        PrismaModule,
        JwtModule.register({
            global: true,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
            privateKey: fs.readFileSync(
                'src/module/auth/certs/private-key.pem',
            ),

            publicKey: fs.readFileSync('src/module/auth/certs/public-key.pem'),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, utils],
})
export class AuthModule {}

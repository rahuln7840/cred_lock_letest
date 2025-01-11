import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './module/device/device.module';
import { UserModule } from './module/user/user.module';
import { DeviceActivityModule } from './module/device-activity/device-activity.module';
import { DashboardModule } from './module/dashboard/dashboard.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { OtpModule } from './module/otp/otp.module';
import { SubscriptionModule } from './module/subscription/subscription.module';
import { DeviceDataModule } from './module/device-data/device-data.module';
import { DeviceGraphModule } from './module/device-graph/device-graph.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URL),
        AuthModule,
        OtpModule,
        DashboardModule,
        DeviceModule,
        SubscriptionModule,
        DeviceDataModule,
        UserModule,
        DeviceActivityModule,
        DeviceGraphModule,
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements OnModuleInit {
    private readonly logger = new Logger(AppModule.name);

    async onModuleInit() {
        const mongoose = (await import('mongoose')).default;

        mongoose.connection.on('connected', () => {
            this.logger.error('DB is connected');
            console.log('DB is connected');
        });

        mongoose.connection.on('error', (err) => {
            this.logger.error(`DB connection error: ${err.message}`);
        });

        mongoose.connection.on('disconnected', () => {
            this.logger.warn('DB is disconnected');
        });
    }
}

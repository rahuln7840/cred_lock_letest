import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from '../device/schemas/device.schema';
import { ActivityLofSchema } from '../device-activity/schemas/activitylogs.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Device', schema: DevicesSchema },
            { name: 'Activity', schema: ActivityLofSchema },
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}

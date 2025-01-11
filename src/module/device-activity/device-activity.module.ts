import { Module } from '@nestjs/common';
import { DeviceActivityController } from './device-activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLofSchema } from './schemas/activitylogs.schema';
import { DevicesSchema } from '../device/schemas/device.schema';
import { DeviceActivityService } from './device-activity.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Activity', schema: ActivityLofSchema },
            { name: 'Device', schema: DevicesSchema },
        ]),
    ],
    controllers: [DeviceActivityController],
    providers: [DeviceActivityService],
})
export class DeviceActivityModule {}

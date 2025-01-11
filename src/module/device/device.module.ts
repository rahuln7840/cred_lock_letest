import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from './schemas/device.schema';
import { ActivityLofSchema } from '../device-activity/schemas/activitylogs.schema';
import { utils } from '@common/helper/utils';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Device', schema: DevicesSchema },
            { name: 'Activity', schema: ActivityLofSchema },
        ]),
    ],
    controllers: [DeviceController],
    providers: [DeviceService, utils],
})
export class DeviceModule {}

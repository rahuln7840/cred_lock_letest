import { Module } from '@nestjs/common';
import { DeviceDataController } from './device-data.controller';
import { DeviceDataService } from './device-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from '../device/schemas/device.schema';
import { SubscriptionSchema } from '../subscription/schema/subscription.schema';
import { utils } from '@common/helper/utils';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Device', schema: DevicesSchema },
            { name: 'Subscription', schema: SubscriptionSchema },
        ]),
    ],
    controllers: [DeviceDataController],
    providers: [DeviceDataService, utils],
})
export class DeviceDataModule {}

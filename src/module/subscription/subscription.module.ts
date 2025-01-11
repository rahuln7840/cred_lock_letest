import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from '../device/schemas/device.schema';
import { SubscriptionSchema } from './schema/subscription.schema';
import { utils } from '@common/helper/utils';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Device', schema: DevicesSchema },
            { name: 'Subscription', schema: SubscriptionSchema },
        ]),
    ],
    controllers: [SubscriptionController],
    providers: [SubscriptionService, utils],
})
export class SubscriptionModule {}

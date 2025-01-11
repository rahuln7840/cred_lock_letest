import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
    @Prop({ required: true })
    customer_name: string;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true })
    apn_number: number;

    @Prop({ required: true, type: Date, index: true })
    payment_date: Date;

    @Prop({ required: true, type: Date, index: true })
    Subscribe_date: Date;

    @Prop({ required: true, type: Date, index: true })
    expiry_date: Date;

    @Prop({ type: Date, default: Date.now })
    last_update: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

SubscriptionSchema.index({ device_id: 1, payment_date: 1 });

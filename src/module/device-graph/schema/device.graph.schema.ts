import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DeviceGraphDocument = HydratedDocument<DeviceGraph>;

@Schema()

//currently i  expecting this data felid from the device so this might have to change in far future
// for adding graph first u need to resister the device from the admin panel
export class DeviceGraph {
    // @Prop({ required: true })
    // apn_number: number;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: false })
    current: number;

    @Prop({ required: false, default: 0 })
    voltage: number;

    @Prop({ required: false, default: 0 })
    temperature: number;

    @Prop({ required: false, default: 0 })
    consumption: number;

    @Prop({ required: false, type: Date, default: Date.now })
    created_at: Date;
}

export const DevicesGraphSchema = SchemaFactory.createForClass(DeviceGraph);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BatteryHealth, DeviceStatus } from '../../../common/helper/enums';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
    @Prop({ required: true })
    customer_id: string;

    @Prop({ required: true, index: true })
    customer_email: string;

    @Prop({ required: true })
    customer_phone_no: number;

    @Prop({ required: true })
    apn_number: number;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true, index: true })
    device_name: string;

    @Prop({ required: true, enum: DeviceStatus, default: 'online' })
    status: DeviceStatus;

    @Prop({ required: false })
    current: number;

    @Prop({ required: false, default: 0 })
    voltage: number;

    @Prop({ required: false, enum: BatteryHealth, default: 'good' })
    battery_health_status: BatteryHealth;

    @Prop({ required: false, default: 0 })
    consumption_kwh: number;

    @Prop({ required: false, default: false })
    box_lock: boolean;

    @Prop({ required: false, default: false })
    lock: boolean;

    @Prop({ required: false, type: Date, default: Date.now })
    created_at: Date;

    @Prop({ required: false, type: Date, default: Date.now })
    last_update: Date;

    // @Prop({ required: true })
    // admin_id: string;
}

export const DevicesSchema = SchemaFactory.createForClass(Device);

DevicesSchema.index({ customer_email: 1, device_name: 1 });

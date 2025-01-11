import { BatteryHealth } from '@common/helper/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorDataDocument = HydratedDocument<SensorData>;

@Schema()
export class SensorData {
    @Prop({ required: true })
    current: number;

    @Prop({ required: true })
    voltage: number;

    @Prop({ required: true })
    consumption_kwh: number;

    @Prop({ default: 0 })
    latitude: string;

    @Prop({ default: 0 })
    longitude: string;

    @Prop({ default: 0 })
    temperature: string;

    @Prop({ default: 0 })
    humidity: string;

    @Prop({ default: 0 })
    pressure: string;

    @Prop({ default: 0 })
    altitude: string;

    @Prop({ default: 0 })
    deviceId: string;

    @Prop({ required: false, enum: BatteryHealth, default: 'good' })
    battery_health_status: BatteryHealth;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
SensorDataSchema.index({ customer_email: 1, device_name: 1 });

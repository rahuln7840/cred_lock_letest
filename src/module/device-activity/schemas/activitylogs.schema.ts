import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ActivityLogDocument = HydratedDocument<Activity>;

@Schema()
export class Activity {
    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true, default: 0 })
    device_logs: string;

    @Prop({ required: true, type: Date, default: Date.now })
    created_at: Date;
}

export const ActivityLofSchema = SchemaFactory.createForClass(Activity);

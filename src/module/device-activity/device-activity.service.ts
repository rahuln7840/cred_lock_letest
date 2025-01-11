import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityLogDocument } from './schemas/activitylogs.schema';
import { Model } from 'mongoose';
import { ActivityLogsDto } from './dto/activityLogs.dto';
import { Device, DeviceDocument } from '../device/schemas/device.schema';

@Injectable()
export class DeviceActivityService {
    constructor(
        @InjectModel('Activity')
        private readonly activityModel: Model<ActivityLogDocument>,
        @InjectModel('Device')
        private readonly deviceModel: Model<DeviceDocument>,
    ) {}

    async addLogs(dto: ActivityLogsDto) {
        const findDevice = await this.deviceModel.findOne({
            device_id: dto.deviceId,
        });
        if (!findDevice) throw new BadRequestException('can not find the device');

        const result = await new this.activityModel({
            device_id: dto.deviceId,
            device_logs: dto.deviceLogs,
        }).save();

        if (!result)
            throw new BadRequestException(
                'something went wrong at activityLog',
            );
        return result;
    }

    async findLogs() {
        const result = await this.activityModel
            .find()
            .populate('device_id')
            .exec();
        return result;
    }
}

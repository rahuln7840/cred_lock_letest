import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeviceGraphDto } from './dto/device-graph.dto';
import { DeviceGraph, DeviceGraphDocument } from './schema/device.graph.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from '../device/schemas/device.schema';

@Injectable()
export class DeviceGraphService {
    constructor(
        @InjectModel(DeviceGraph.name)
        private readonly graphModel: Model<DeviceGraphDocument>,
        @InjectModel(Device.name)
        private readonly deviceModel: Model<DeviceDocument>,
    ) {}

    async addLiveData(dto: CreateDeviceGraphDto) {
        try {
            const checkCustomer = await this.deviceModel.findOne({
                device_id: dto.device_id,
            });
            if (!checkCustomer) {
                throw new BadRequestException(
                    'Device not found First Register Device from admin panel',
                );
            }
            const device = new this.graphModel(dto);
            return await device.save();
        } catch (e) {
            console.log('error while adding the data Graph', e);
            throw new BadRequestException(e.message);
        }
    }

    async getGraphData(deviceId: string) {
        try {
            const data = await this.graphModel
                .find({ device_id: deviceId })
                .exec();

            if (!data || data.length === 0) {
                throw new BadRequestException(
                    `No data found for the device ID: ${deviceId}`,
                );
            }

            const response = {
                _id: data[0]._id,
                // apn_number: data[0].apn_number,
                device_id: data[0].device_id,
                // created_at: data[0].created_at,
                graph_for_voltage: data.map((item) => ({
                    current: item.current,
                    voltage: item.voltage,
                    created_at: item.created_at,
                })),
                graph_for_consumption: data.map((item) => ({
                    temperature: item.temperature,
                    consumption: item.consumption,
                    created_at: item.created_at,
                })),
            };

            return response;
        } catch (error) {
            console.error('Error while getting the data graph:', error);
            throw new BadRequestException(error.message);
        }
    }
}

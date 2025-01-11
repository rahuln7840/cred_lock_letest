import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { Model } from 'mongoose';
import {
    AddDeviceDto,
    UpdateBoxAndLockDto,
    UpdateDeviceDto,
} from './dto/device.dto';
import { UpdateDeviceFields } from 'src/common/types/device.types';
import { ObjectId } from 'mongodb';
import {
    Activity,
    ActivityLogDocument,
} from '../device-activity/schemas/activitylogs.schema';
import { CustomerType } from 'src/common/helper/enums';
import { utils } from '@common/helper/utils';
import { find } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<DeviceDocument>,
        @InjectModel(Activity.name)
        private readonly activityModel: Model<ActivityLogDocument>,
        private readonly prismaService: PrismaService,
        private readonly utils: utils,
    ) {}

    async create(dto: AddDeviceDto): Promise<Device> {
        // const findAdmin = await this.utils.findAdmin(adminId);
        // if (!findAdmin) {
        //     throw new BadRequestException('Admin not found');
        // }
        const existingDevice = await this.deviceModel
            .findOne({ device_id: dto.deviceId })
            .lean()
            .exec();
        if (existingDevice) {
            throw new BadRequestException('Device is already added');
        }
        const validBatteryHealthStatuses = [
            'good',
            'moderate',
            'critical',
            'dead',
        ];

        if (dto?.batteryHealthStatus) {
            if (
                !validBatteryHealthStatuses.includes(
                    dto.batteryHealthStatus.toLowerCase(),
                )
            ) {
                throw new BadRequestException(
                    'Invalid battery health status. Allowed values: GOOD, MODERATE, CRITICAL, DEAD',
                );
            }
        }
        const newDevice = new this.deviceModel({
            customer_id: dto.customerId,
            customer_email: dto.customerEmail,
            customer_phone_no: dto.customerPhoneNo,
            apn_number: dto.apnNumber,
            device_id: dto.deviceId,
            device_name: dto.deviceName,
            current: dto.current,
            voltage: dto.voltage,
            battery_health_status: dto.batteryHealthStatus,
            status: dto.status,
            // admin_id: adminId,
        });

        return await newDevice.save();
    }

    async findDevice(page, limit) {
        const { skip, take } = await this.utils.calculatePagination(
            page,
            limit,
        );

        const devices = await this.deviceModel
            .find()
            .skip(skip)
            .limit(take)
            .exec();
        const logs = await this.activityModel.find().exec();

        const totalDevicesCount = await this.deviceModel.countDocuments().exec();

        const DevicesWithLogs = devices.map((device) => {
            const associatedLogs = logs.filter(
                (log) => log.device_id === device.device_id,
            );

            const final = {
                ...device.toObject(),
                device_logs: associatedLogs,
            };
            return final;
        });

        let lockedDevice = devices
            .filter((x) => x.lock === true)
            .map((device) => {
                return {
                    apn_number: device.apn_number,
                    device_name: device.device_name,
                };
            });

        let response = {
            device_data: devices,
            locked_device_data: lockedDevice,
            meta: {
                total_records: totalDevicesCount,      
                current_page: page,                    
                page_size: take,                       
                current_page_records: devices.length,   
            },
        };
        return response;
    }

    async findDeviceOptimized() {
        const devices = await this.deviceModel
            .aggregate([
                {
                    $lookup: {
                        from: 'ActivityLofSchema',
                        localField: 'device_id',
                        foreignField: 'device_id',
                        as: 'device_logs',
                    },
                },
            ])
            .exec();
        console.log('lookups', devices);
        let lockedDevice = devices
            .filter((x) => x.lock === true)
            .map((device) => {
                return {
                    apn_number: device.apn_number,
                    device_name: device.device_name,
                };
            });

        let response = {
            device_data: devices,
            locked_device_data: lockedDevice,
        };
        return response;
    }

    async findCustomerDetails(
        id: string,
        type: 'INFORMATION' | 'DEVICE' | 'LOGS',
    ) {
        const checkCustomer = await this.deviceModel.findOne({
            customer_id: id,
        });
        if (!checkCustomer) throw new BadRequestException('Customer not found');
        const devices = await this.deviceModel
            .findOne({ customer_id: id })
            .exec();
        const logs = await this.activityModel
            .find({ device_id: devices.device_id })
            .exec();

        const response = {};

        switch (type) {
            case 'INFORMATION':
                response['customer_id'] = checkCustomer.customer_id;
                response['customer_email'] = checkCustomer.customer_email;
                response['customer_phone_no'] = checkCustomer.customer_phone_no;
                break;

            case 'DEVICE':
                response['apn_number'] = checkCustomer.apn_number;
                response['device_id'] = checkCustomer.device_id;
                response['device_name'] = checkCustomer.device_name;
                response['status'] = checkCustomer.status;
                response['current'] = checkCustomer.current;
                response['voltage'] = checkCustomer.voltage;
                response['battery_health_status'] =
                    checkCustomer.battery_health_status;
                response['consumption_kwh'] = checkCustomer.consumption_kwh;
                response['last_status'] = checkCustomer.last_update;
                break;

            case 'LOGS':
                response['device_logs'] = logs;
                break;

            default:
                throw new BadRequestException('Invalid type');
        }

        return response;
    }

    async getDeviceById(id: string) {
        const findDevice = await this.deviceModel
            .findOne({ device_id: id })
            .lean()
            .exec();

        if (!findDevice) {
            throw new BadRequestException('Device does no000t exist');
        }
        return findDevice;
    }

    async updateDevice(dto: UpdateDeviceDto, id: string) {
        const findDevice = await this.deviceModel
            .findOne({ device_id: id })
            .lean()
            .exec();
        if (!findDevice) {
            throw new BadRequestException('Device does not exist');
        }
        const validBatteryHealthStatuses = [
            'good',
            'moderate',
            'critical',
            'dead',
        ];

        if (dto?.batteryHealthStatus) {
            if (
                !validBatteryHealthStatuses.includes(
                    dto.batteryHealthStatus.toLowerCase(),
                )
            ) {
                throw new BadRequestException(
                    'Invalid battery health status. Allowed values: GOOD, MODERATE, CRITICAL, DEAD',
                );
            }
        }

        console.log('--dto', dto);
        const updateFields: UpdateDeviceFields = {};

        if (dto.customerId) updateFields.customer_id = dto.customerId;
        if (dto.customerEmail) updateFields.customer_email = dto.customerEmail;
        if (dto.customerPhoneNo !== undefined)
            updateFields.customer_phone_no = dto.customerPhoneNo;
        if (dto.apnNumber !== undefined)
            updateFields.apn_number = dto.apnNumber;
        if (dto.deviceId) updateFields.device_id = dto.deviceId;
        if (dto.deviceName) updateFields.device_name = dto.deviceName;
        if (dto.current !== undefined) updateFields.current = dto.current;
        if (dto.voltage !== undefined) updateFields.voltage = dto.voltage;
        if (dto.batteryHealthStatus)
            updateFields.battery_health_status = dto.batteryHealthStatus;
        if (dto.status) updateFields.status = dto.status;
        if (dto.boxLock !== undefined) updateFields.box_lock = dto.boxLock;
        if (dto.lock !== undefined) updateFields.lock = dto.lock;

        console.log('--about to update ', updateFields);
        const updatedDevice = await this.deviceModel
            .findOneAndUpdate(
                { device_id: id },
                { $set: updateFields, last_update: new Date() },
                { new: true },
            )
            .exec();
        console.log('--is update ', updatedDevice);

        return updatedDevice;
    }

    async deleteDevice(id: string) {
        let device = await this.deviceModel.findOne({ device_id: id }).lean();
        if (!device) {
            throw new BadRequestException('Unable to find device');
        }

        let logs = await this.activityModel.find({ device_id: id }).exec();

        let deletedDevice = await this.deviceModel.findOneAndDelete({
            device_id: id,
        });
        if (!deletedDevice || !logs) {
            throw new BadRequestException('Unable to delete device or device ');
        }

        let deletedLogs = await this.activityModel
            .deleteMany({ device_id: id })
            .exec();

        return { ...deletedDevice.toObject(), device_logs: deletedLogs };
    }

    async updateDeviceBoxLock(dto: UpdateBoxAndLockDto, id: string) {
        const findDevice = await this.deviceModel
            .findOne({ device_id: id })
            .lean()
            .exec();
        if (!findDevice) {
            throw new BadRequestException('Device does not exist');
        }

        const updateFields: UpdateDeviceFields = {};

        if (dto.boxLock !== undefined) updateFields.box_lock = dto.boxLock;
        if (dto.lock !== undefined) updateFields.lock = dto.lock;

        // If no fields are provided, return the original document without updating
        if (Object.keys(updateFields).length === 0) {
            return findDevice;
        }

        const updatedDevice = await this.deviceModel
            .findOneAndUpdate(
                { device_id: id },
                { $set: updateFields, last_update: new Date() },
                { new: true },
            )
            .exec();

        return updatedDevice;
    }
}

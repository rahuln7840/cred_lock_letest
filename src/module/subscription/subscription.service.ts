import { BadRequestException, Injectable } from '@nestjs/common';
import {
    Subscription,
    SubscriptionDocument,
} from './schema/subscription.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrismaService } from '../prisma/prisma.service';
import { utils } from '@common/helper/utils';
import { SubscriptionDto, updateSubscriptionDto } from './dto/subscribe.dto';
import { Device, DeviceDocument } from '../device/schemas/device.schema';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name)
        private readonly subscriptionModel: Model<SubscriptionDocument>,
        @InjectModel(Device.name)
        private readonly deviceModel: Model<DeviceDocument>,
        private readonly prismaService: PrismaService,
        private readonly utils: utils,
    ) {}

    async create(dto: SubscriptionDto): Promise<Subscription> {
        const existingDevice = await this.deviceModel
            .findOne({ device_id: dto.device_id })
            .lean()
            .exec();
        if (!existingDevice) {
            throw new BadRequestException('DeviceId not found');
        }

        const newSubscription = new this.subscriptionModel({
            customer_name: dto.customer_name,
            device_id: dto.device_id,
            apn_number: dto.apn_number,
            payment_date: new Date(dto.payment_date),
            Subscribe_date: new Date(dto.Subscribe_date),
            expiry_date: new Date(dto.expiry_date),
        });

        const createdSubscription = await newSubscription.save();

        return createdSubscription;
    }

    async updateSubscription(dto: updateSubscriptionDto, id: string) {
        const device = await this.deviceModel
            .findOne({ device_id: id })
            .lean()
            .exec();
        if (!device) {
            throw new BadRequestException('Device does not exist');
        }

        const updateFields: UpdateFields = {};

        if (dto.device_id) updateFields.device_id = dto.device_id;
        if (dto.customer_name) updateFields.customer_name = dto.customer_name;
        if (dto.apn_number !== undefined)
            updateFields.apn_number = dto.apn_number;
        if (dto.payment_date)
            updateFields.payment_date = new Date(dto.payment_date);
        if (dto.Subscribe_date)
            updateFields.Subscribe_date = new Date(dto.Subscribe_date);
        if (dto.expiry_date)
            updateFields.expiry_date = new Date(dto.expiry_date);

        if (Object.keys(updateFields).length === 0) {
            throw new BadRequestException('No valid fields to update');
        }

        updateFields.last_update = new Date();

        const updatedSub = await this.subscriptionModel
            .findOneAndUpdate(
                { device_id: id },
                { $set: updateFields },
                { new: true },
            )
            .exec();

        if (!updatedSub) {
            throw new BadRequestException('Subscription update failed');
        }

        return updatedSub;
    }

    async findSubscription(page, limit) {
        const { skip, take } = await this.utils.calculatePagination(
            page,
            limit,
        );
        const totalSubscriptionCount = await this.subscriptionModel.countDocuments().exec();
        const subscription = await this.subscriptionModel
            .find()
            .skip(skip)
            .limit(take)
            .exec();

            const response ={
                ...subscription,
                
                meta: {
                    total_records: totalSubscriptionCount,      
                    current_page: page,                    
                    page_size: take,                       
                    current_page_records: subscription.length,   
                },
            }

        return response;
    }

    async removeSubscription(id: string) {
        const device = await this.deviceModel
            .findOne({ device_id: id })
            .lean()
            .exec();
        if (!device) {
            throw new BadRequestException('Device does not exist');
        }

        const remove = await this.subscriptionModel.findOneAndDelete({
            device_id: id,
        });

        return remove;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument } from '../device/schemas/device.schema';
import { ActivityLogDocument } from '../device-activity/schemas/activitylogs.schema';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('Activity')
        private readonly activityModel: Model<ActivityLogDocument>,
        @InjectModel('Device')
        private readonly deviceModel: Model<DeviceDocument>,
    ) {}

    async dashboard() {
        const daysOfWeek = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];

        const totalDeviceCount = await this.deviceModel.countDocuments();
        const totalDeviceData = await this.deviceModel.find();
        const totalBlockedDevice = await this.deviceModel.countDocuments({
            lock: true,
        });
        const totalActiveDevice = await this.deviceModel.countDocuments({
            status: 'online',
        });

        const percentageForBlockedDevice = (
            (totalBlockedDevice / totalDeviceCount) *
            100
        ).toFixed(2);
        const percentageForActiveDevice = (
            (totalActiveDevice / totalDeviceCount) *
            100
        ).toFixed(2);

        const device_chart = daysOfWeek.map((day) => ({
            day,
            device_count: 0,
        }));
        const active_device_chart = daysOfWeek.map((day) => ({
            day,
            active_device_count: 0,
        }));

        // Populate charts with data
        totalDeviceData.forEach((device) => {
            const createdAt = new Date(device.created_at);
            let dayIndex = createdAt.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
            dayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Adjust to 0 for Monday, 1 for Tuesday, etc.

            device_chart[dayIndex].device_count += 1;

            if (device.status === 'online') {
                active_device_chart[dayIndex].active_device_count += 1;
            }
        });

        const result = {
            device_sold_count: totalDeviceCount,
            active_device_count: totalActiveDevice,
            blocked_device_count: totalBlockedDevice,
            weekly_statistic: {
                sold_device_percentage: 49.5, //static
                active_device_percentage: parseFloat(percentageForActiveDevice),
                blocked_device_percentage: parseFloat(
                    percentageForBlockedDevice,
                ),
            },
            device_chart: device_chart,
            active_device_chart: active_device_chart,
        };

        return result;
    }

    async dashboardOldwithOutGraf() {
        let totalDeviceCount = await this.deviceModel.countDocuments();
        let totalDeviceData = await this.deviceModel.find();
        let totalBlockedDevice = await this.deviceModel.countDocuments({
            lock: true,
        });
        let totalActiveDevice = await this.deviceModel.countDocuments({
            status: 'online',
        });
        let percentageForBlockedDevice = (
            (totalBlockedDevice / totalDeviceCount) *
            100
        ).toFixed(2);
        let percentageForActiveDevice = (
            (totalActiveDevice / totalDeviceCount) *
            100
        ).toFixed(2);

        const result = {
            device_sold_count: totalDeviceCount,
            active_device_count: totalActiveDevice,
            blocked_device_count: totalBlockedDevice,
            weekly_statistic: {
                sold_device_percentage: 49.5, //static
                active_device_percentage: parseFloat(percentageForActiveDevice),
                blocked_device_percentage: parseFloat(
                    percentageForBlockedDevice,
                ),
            },
            device_sold_chart: {},
            active_device_chart: {},
        };

        return result;
    }

    async search(query: string) {
        const searchQuery = {
            $or: [
                { device_name: { $regex: `^${query}`, $options: 'i' } },
                { customer_email: { $regex: `^${query}`, $options: 'i' } },
            ],
        };

        return this.deviceModel
            .find(searchQuery)
            .select('device_name customer_email')
            .exec();
    }
}

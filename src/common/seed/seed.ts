import mongoose from 'mongoose';
import {
    Device,
    DevicesSchema,
} from '../../module/device/schemas/device.schema';
import { BatteryHealth, DeviceStatus } from '../../common/helper/enums';
import {
    Activity,
    ActivityLofSchema,
} from '../../module/device-activity/schemas/activitylogs.schema';
import * as dotenv from 'dotenv';
import { DeviceGraph, DevicesGraphSchema } from '../../module/device-graph/schema/device.graph.schema';

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connection 🟢');
    } catch (error) {
        console.error('DB connection 🔴', error);
        process.exit(1);
    }
};

const clearDB = async () => {
    try {
        const DeviceModel = mongoose.model(Device.name, DevicesSchema);
        const ActivityModel = mongoose.model(Activity.name, ActivityLofSchema);
        const DeviceGraphModel = mongoose.model(
            DeviceGraph.name,
            DevicesGraphSchema,
        );

        await DeviceModel.deleteMany({});
        await ActivityModel.deleteMany({});
        await DeviceGraphModel.deleteMany({});
        console.log('    :: DB CLEARED ::    ');
    } catch (e) {
        console.error('Error clearing the database:', e.message);
    }
};

const seedDatabase = async () => {
    const DeviceModel = mongoose.model(Device.name, DevicesSchema);
    const ActivityModel = mongoose.model(Activity.name, ActivityLofSchema);
    const DeviceGraphModel = mongoose.model(
        DeviceGraph.name,
        DevicesGraphSchema,
    );

    const seedDevices = [
        {
            customer_id: '3333333333',
            customer_email: 'customer3@example.com',
            customer_phone_no: 1234567892,
            apn_number: 3333,
            device_id: '1234567822',
            device_name: 'Device Three',
            status: DeviceStatus.OFFLINE,
            current: 8.5,
            voltage: 4.8,
            battery_health_status: BatteryHealth.CRITICAL,
            consumption_kwh: 1.2,
            box_lock: true,
            lock: false,
            created_at: '2024-01-01T13:10:38.524Z',
            last_update: '2024-01-01T13:10:38.524Z',
        },
        {
            customer_id: '4444444444',
            customer_email: 'customer4@example.com',
            customer_phone_no: 1234567893,
            apn_number: 4444,
            device_id: '1234567833',
            device_name: 'Device Four',
            status: DeviceStatus.ONLINE,
            current: 15.2,
            voltage: 5.5,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 2.5,
            box_lock: false,
            lock: true,
            created_at: '2024-01-03T13:10:38.524Z',
            last_update: '2024-01-03T13:10:38.524Z',
        },
        {
            customer_id: '5555555555',
            customer_email: 'customer5@example.com',
            customer_phone_no: 1234567894,
            apn_number: 5555,
            device_id: '1234567844',
            device_name: 'Device Five',
            status: DeviceStatus.OFFLINE,
            current: 9.3,
            voltage: 5.1,
            battery_health_status: BatteryHealth.DEAD,
            consumption_kwh: 1.8,
            box_lock: true,
            lock: true,
            created_at: '2024-01-04T13:10:38.524Z',
            last_update: '2024-01-04T13:10:38.524Z',
        },
        {
            customer_id: '6666666666',
            customer_email: 'customer6@example.com',
            customer_phone_no: 1234567895,
            apn_number: 6666,
            device_id: '1234567855',
            device_name: 'Device Six',
            status: DeviceStatus.OFFLINE,
            current: 7.9,
            voltage: 4.7,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 1.0,
            box_lock: false,
            lock: false,
            created_at: '2024-01-03T13:10:38.524Z',
            last_update: '2024-01-03T12:10:38.524Z',
        },
        {
            customer_id: '7777777777',
            customer_email: 'customer7@example.com',
            customer_phone_no: 1234567896,
            apn_number: 7777,
            device_id: '1234567866',
            device_name: 'Device Seven',
            status: DeviceStatus.ONLINE,
            current: 10.7,
            voltage: 5.0,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 1.3,
            box_lock: false,
            lock: false,
            created_at: '2024-01-03T13:10:38.524Z',
            last_update: '2024-01-03T12:10:38.524Z',
        },
        {
            customer_id: '8888888888',
            customer_email: 'customer8@example.com',
            customer_phone_no: 1234567897,
            apn_number: 8888,
            device_id: '1234567877',
            device_name: 'Device Eight',
            status: DeviceStatus.ONLINE,
            current: 11.2,
            voltage: 4.9,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 1.7,
            box_lock: true,
            lock: false,
            created_at: '2024-01-02T13:10:38.524Z',
            last_update: '2024-01-02T12:10:38.524Z',
        },
        {
            customer_id: '9999999999',
            customer_email: 'customer9@example.com',
            customer_phone_no: 1234567898,
            apn_number: 9999,
            device_id: '1234567888',
            device_name: 'Device Nine',
            status: DeviceStatus.ONLINE,
            current: 12.4,
            voltage: 5.2,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 2.0,
            box_lock: false,
            lock: true,
            created_at: '2024-01-05T13:10:38.524Z',
            last_update: '2024-01-05T13:10:38.524Z',
        },
        {
            customer_id: '0000000000',
            customer_email: 'customer10@example.com',
            customer_phone_no: 1234567899,
            apn_number: 6767,
            device_id: '1234567899',
            device_name: 'Device Ten',
            status: DeviceStatus.OFFLINE,
            current: 8.8,
            voltage: 4.6,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 1.5,
            box_lock: true,
            lock: false,
            created_at: '2024-01-06T13:10:38.524Z',
            last_update: '2024-01-06T13:10:38.524Z',
        },
        {
            customer_id: '1111111112',
            customer_email: 'customer11@example.com',
            customer_phone_no: 1234567800,
            apn_number: 1112,
            device_id: '1234567810',
            device_name: 'Device Eleven',
            status: DeviceStatus.ONLINE,
            current: 13.5,
            voltage: 5.4,
            battery_health_status: BatteryHealth.CRITICAL,
            consumption_kwh: 2.2,
            box_lock: false,
            lock: true,
            created_at: '2024-01-05T13:10:38.524Z',
            last_update: '2024-01-05T13:10:38.524Z',
        },
        {
            customer_id: '2222222223',
            customer_email: 'customer12@example.com',
            customer_phone_no: 1234567801,
            apn_number: 2223,
            device_id: '1234567821',
            device_name: 'Device Twelve',
            status: DeviceStatus.ONLINE,
            current: 14.1,
            voltage: 5.3,
            battery_health_status: BatteryHealth.GOOD,
            consumption_kwh: 2.3,
            box_lock: true,
            lock: false,
            created_at: '2024-01-03T13:10:38.524Z',
            last_update: '2024-01-03T13:10:38.524Z',
        },
    ];
    const addLogs = [
        {
            device_id: '1234567822',
            device_logs: 'charge phone',
            created_at: '2024-01-01T13:10:38.524Z',
        },
        {
            device_id: '1234567822',
            device_logs: 'turn on refrigerator',
            created_at: '2024-01-01T13:10:38.524Z',
        },
        {
            device_id: '1234567822',
            device_logs: 'charge laptop',
            created_at: '2024-01-01T13:10:38.524Z',
        },
        {
            device_id: '1234567833',
            device_logs: 'turn on TV',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567833',
            device_logs: 'turn off TV',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567833',
            device_logs: 'turn on air cooler',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567844',
            device_logs: 'charge electric car',
            created_at: '2024-01-04T13:10:38.524Z',
        },
        {
            device_id: '1234567844',
            device_logs: 'turn on washing machine',
            created_at: '2024-01-04T13:10:38.524Z',
        },
        {
            device_id: '1234567844',
            device_logs: 'turn off washing machine',
            created_at: '2024-01-04T13:10:38.524Z',
        },
        {
            device_id: '1234567855',
            device_logs: 'turn on microwave',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567855',
            device_logs: 'turn off microwave',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567866',
            device_logs: 'turn on water heater',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567866',
            device_logs: 'turn off fan',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567866',
            device_logs: 'turn on air conditioner',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567888',
            device_logs: 'turn on light',
            created_at: '2024-01-05T13:10:38.524Z',
        },
        {
            device_id: '1234567888',
            device_logs: 'turn off light',
            created_at: '2024-01-05T13:10:38.524Z',
        },
        {
            device_id: '1234567899',
            device_logs: 'turn on radio',
            created_at: '2024-01-06T13:10:38.524Z',
        },
        {
            device_id: '1234567899',
            device_logs: 'turn off radio',
            created_at: '2024-01-06T13:10:38.524Z',
        },
        {
            device_id: '1234567899',
            device_logs: 'turn on blender',
            created_at: '2024-01-06T13:10:38.524Z',
        },
        {
            device_id: '1234567810',
            device_logs: 'charge tablet',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567821',
            device_logs: 'turn on coffee maker',
            created_at: '2024-01-06T13:10:38.524Z',
        },
        {
            device_id: '1234567821',
            device_logs: 'turn off coffee maker',
            created_at: '2024-01-03T13:10:38.524Z',
        },
        {
            device_id: '1234567821',
            device_logs: 'turn on light',
            created_at: '2024-01-03T13:10:38.524Z',
        },
    ];

    const seedGraphData = [
        {
            device_id: '1234567822',
            current: 12.5,
            voltage: 220,
            temperature: 35,
            consumption: 150,
        },
        {
            device_id: '1234567822',
            current: 13.0,
            voltage: 225,
            temperature: 36,
            consumption: 160,
        },
        {
            device_id: '1234567822',
            current: 11.8,
            voltage: 230,
            temperature: 34,
            consumption: 145,
        },
        {
            device_id: '1234567822',
            current: 14.2,
            voltage: 218,
            temperature: 38,
            consumption: 170,
        },
        {
            device_id: '1234567822',
            current: 10.9,
            voltage: 240,
            temperature: 33,
            consumption: 140,
        },
        {
            device_id: '1234567822',
            current: 13.5,
            voltage: 210,
            temperature: 37,
            consumption: 155,
        },
        {
            device_id: '1234567822',
            current: 12.0,
            voltage: 225,
            temperature: 32,
            consumption: 150,
        },
        {
            device_id: '1234567822',
            current: 11.2,
            voltage: 235,
            temperature: 36,
            consumption: 148,
        },
        {
            device_id: '1234567822',
            current: 14.5,
            voltage: 220,
            temperature: 39,
            consumption: 175,
        },
        {
            device_id: '1234567822',
            current: 10.5,
            voltage: 230,
            temperature: 34,
            consumption: 135,
        },
    ];

    try {
        await DeviceModel.insertMany(seedDevices);
        await ActivityModel.insertMany(addLogs);
        await DeviceGraphModel.insertMany(seedGraphData);
        console.log(':::::: SUCCESSFUL ::::::');
    } catch (error) {
        console.error('Error seeding the database', error);
    }
};

const runSeed = async () => {
    await connectToDatabase();
    await clearDB();
    await seedDatabase();
    await mongoose.disconnect();
};

runSeed();

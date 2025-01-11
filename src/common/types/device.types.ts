import { Device } from 'src/module/device/schemas/device.schema';

export type UpdateDeviceFields = Partial<
    Pick<
        Device,
        | 'customer_id'
        | 'customer_email'
        | 'customer_phone_no'
        | 'apn_number'
        | 'device_id'
        | 'device_name'
        | 'status'
        | 'current'
        | 'voltage'
        | 'battery_health_status'
        | 'box_lock'
        | 'lock'
    >
>;

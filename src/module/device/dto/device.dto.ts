import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
} from 'class-validator';
import mongoose from 'mongoose';
import { BatteryHealth, DeviceStatus } from 'src/common/helper/enums';

export class AddDeviceDto {
    @ApiProperty({
        description: 'Add customer id',
        example: '123456789',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty({
        description: 'Add email',
        example: 'example@gmail.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    customerEmail: string;

    @ApiProperty({
        description: 'Add customer number',
        example: '9090909090',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    customerPhoneNo: string;

    @ApiProperty({
        description: 'Add APN number',
        example: 1010101010,
        required: true,
    })
    @IsNotEmpty()
    apnNumber: number;

    @ApiProperty({
        description: 'Add device ID',
        example: '111111111111',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @ApiProperty({
        description: 'Add device name',
        example: 'solar1',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    deviceName: string;

    @ApiProperty({
        description: 'Add current',
        example: 12,
        required: false,
    })
    @IsOptional()
    current?: string;

    @ApiProperty({
        description: 'Add voltage',
        example: 112,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    voltage?: number;

    @ApiProperty({
        description: 'Add battery health status',
        example: 'good',
        enum: BatteryHealth,
        required: false,
    })
    @IsEnum(BatteryHealth)
    @IsOptional()
    batteryHealthStatus?: BatteryHealth;

    @ApiProperty({
        description: 'Add device status',
        example: 'online',
        enum: DeviceStatus,
        required: true,
    })
    @IsEnum(DeviceStatus)
    status?: DeviceStatus;
}

export class UpdateDeviceDto {
    @ApiProperty({
        description: 'Add customer id',
        example: 'uuid',
        required: false,
    })
    @IsString()
    @IsOptional()
    customerId?: string;

    @ApiProperty({
        description: 'Add email',
        example: 'example@gmail.com',
        required: false,
    })
    @IsString()
    @IsOptional()
    customerEmail?: string;

    @ApiProperty({
        description: 'Add customer number',
        example: '9090909090',
        required: false,
    })
    @IsString()
    @IsOptional()
    customerPhoneNo?: number;

    @ApiProperty({
        description: 'Add APN number',
        example: '1010101010',
        required: false,
    })
    @IsString()
    @IsOptional()
    apnNumber?: number;

    @ApiProperty({
        description: 'Add device ID',
        example: 'deviceId',
        required: false,
    })
    @IsString()
    @IsOptional()
    deviceId?: string;

    @ApiProperty({
        description: 'Add device name',
        example: 'solar!',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    deviceName?: string;

    @ApiProperty({
        description: 'Add current',
        example: '12',
        required: false,
    })
    @IsString()
    @IsOptional()
    current?: number;

    @ApiProperty({
        description: 'Add voltage',
        example: 112,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    voltage?: number;

    @ApiProperty({
        description: 'Add battery health status',
        example: 'good',
        enum: BatteryHealth,
        required: false,
    })
    @IsEnum(BatteryHealth)
    @IsOptional()
    batteryHealthStatus?: BatteryHealth;

    @ApiProperty({
        description: 'Add device status',
        example: 'online',
        enum: DeviceStatus,
        required: true,
    })
    @IsEnum(DeviceStatus)
    status?: DeviceStatus;

    @ApiProperty({
        description: 'box lock and unlock',
        example: false,
        required: false,
    })
    @IsOptional()
    boxLock?: boolean;

    @ApiProperty({
        description: 'device lock and unlock',
        example: false,
        required: false,
    })
    @IsOptional()
    lock?: boolean;
}

export class UpdateBoxAndLockDto {
    @ApiProperty({
        description: 'box lock and unlock',
        example: false,
        required: false,
    })
    @IsOptional()
    boxLock?: boolean;

    @ApiProperty({
        description: 'device lock and unlock',
        example: false,
        required: false,
    })
    @IsOptional()
    lock?: boolean;
}

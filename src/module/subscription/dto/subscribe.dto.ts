import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsNotEmpty,
    IsNumber,
    Matches,
} from 'class-validator';

export class SubscriptionDto {
    @ApiProperty({
        description: 'Add customer id',
        example: '123456789',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    device_id: string;

    @ApiProperty({
        description: 'Add customer name',
        example: 'john wick',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    customer_name: string;

    @ApiProperty({
        description: 'Add APN number',
        example: 1010101010,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    apn_number?: number;

    @ApiProperty({
        description: 'Payment date in YYYY-MM-DD format',
        example: '2001-01-01',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'payment_date must be in the format YYYY-MM-DD',
    })
    payment_date: string;

    @ApiProperty({
        description: 'Subscription start date in YYYY-MM-DD format',
        example: '2001-01-01',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Subscribe_date must be in the format YYYY-MM-DD',
    })
    Subscribe_date: string;

    @ApiProperty({
        description: 'Subscription expiry date in YYYY-MM-DD format',
        example: '2024-02-02',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'expiry_date must be in the format YYYY-MM-DD',
    })
    expiry_date: string;
}

export class updateSubscriptionDto {
    @ApiProperty({
        description: 'Add customer id',
        example: '123456789',
        required: true,
    })
    @IsString()
    @IsOptional()
    device_id?: string;

    @ApiProperty({
        description: 'Add customer name',
        example: 'batman',
        required: true,
    })
    @IsString()
    @IsOptional()
    customer_name?: string;

    @ApiProperty({
        description: 'Add APN number',
        example: 1010101010,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    apn_number?: number;

    @ApiProperty({
        description: 'Payment date in YYYY-MM-DD format',
        example: '2024-09-04',
        required: true,
    })
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'payment_date must be in the format YYYY-MM-DD',
    })
    payment_date?: string;

    @ApiProperty({
        description: 'Subscription start date in YYYY-MM-DD format',
        example: '2024-09-04',
        required: true,
    })
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Subscribe_date must be in the format YYYY-MM-DD',
    })
    Subscribe_date?: string;

    @ApiProperty({
        description: 'Subscription expiry date in YYYY-MM-DD format',
        example: '2024-12-04',
        required: true,
    })
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'expiry_date must be in the format YYYY-MM-DD',
    })
    expiry_date?: string;
}

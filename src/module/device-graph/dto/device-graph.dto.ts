import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDeviceGraphDto {
    // @ApiProperty({
    //     example: 3333,
    //     description: 'The APN number of the device',
    // })
    // @IsNotEmpty()
    // @IsNumber()
    // apn_number: number;

    @ApiProperty({
        example: '1234567822',
        description: 'The unique identifier for the device',
    })
    @IsNotEmpty()
    device_id: string;

    @ApiProperty({
        example: 12.5,
        description: 'The current measured in amps',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    current?: number;

    @ApiProperty({
        example: 220,
        description: 'The voltage measured in volts',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    voltage?: number;

    @ApiProperty({
        example: 35,
        description: 'The temperature measured in degrees Celsius',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    temperature?: number;

    @ApiProperty({
        example: 150,
        description: 'The power consumption in kWh',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    consumption?: number;
}

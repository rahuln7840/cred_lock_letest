import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActivityLogsDto {
    @ApiProperty({
        description: 'Add device is ',
        example: 'uuid',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @ApiProperty({
        description: 'add the log which will expected came',
        example: 'turn on fan',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    deviceLogs: string;
}

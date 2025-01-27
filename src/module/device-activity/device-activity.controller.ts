import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { DeviceActivityService } from './device-activity.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ApiError } from 'src/common/helper/error_description';
import { ActivityLogsDto } from './dto/activityLogs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('device-activity')
@ApiTags('Logs-From-Device')
export class DeviceActivityController {
    constructor(private readonly service: DeviceActivityService) {}

    @Post()
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'add logs ',
        description: 'add) logs will came form the solar device',
    })
    create(@Body() dto: ActivityLogsDto) {
        return this.service.addLogs(dto);
    }

    @Get()
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'find device',
        description: 'find device',
    })
    find() {
        return this.service.findLogs();
    }

    @Get('logs/:deviceId')
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'find device',
        description: 'find device',
    })
    async findLogsByDeviceId(@Param('deviceId') deviceId: string) {
        try {
            return await this.service.findLogsByDeviceId(deviceId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

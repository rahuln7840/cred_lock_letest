import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceGraphService } from './device-graph.service';
import { ApiError } from '@common/helper/error_description';
import { CreateDeviceGraphDto } from './dto/device-graph.dto';

@Controller('device-graph')
@ApiTags('Device Graph')
export class DeviceGraphController {
    constructor(private readonly service: DeviceGraphService) {}

    @Post('graph')
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
        summary: 'add device continues data for the graph',
        description: 'graph',
    })
    create(@Body() dto: CreateDeviceGraphDto) {
        // @Request() req
        // const adminId = req.user.id;
        return this.service.addLiveData(dto);
    }

    @Get('graph/:deviceId')
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
        summary: 'get graph data',
        description: 'graph',
    })
    customer(@Param('deviceId') deviceId: string) {
        return this.service.getGraphData(deviceId);
    }
}

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ApiError } from 'src/common/helper/error_description';
import { DashboardService } from './dashboard.service';
import { Device } from '../device/schemas/device.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
    constructor(private readonly service: DashboardService) {}

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
        summary: 'Dashboard',
        description: 'Dashboard',
    })
    find() {
        return this.service.dashboard();
    }

    @Get('search')
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
        summary: 'Search by only DEVICE_NAME and DEVICE_EMAIL',
        description: 'Search by only DEVICE_NAME and DEVICE_EMAIL',
    })
    async search(@Query('search') query: string) {
        return await this.service.search(query);
    }
}

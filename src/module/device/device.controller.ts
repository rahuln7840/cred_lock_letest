import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiError } from 'src/common/helper/error_description';
import {
    AddDeviceDto,
    UpdateBoxAndLockDto,
    UpdateDeviceDto,
} from './dto/device.dto';
import { CustomerType } from 'src/common/helper/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('device')
@ApiTags('Devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

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
        summary: 'create feedback',
        description: 'create feedback',
    })
    create(@Body() dto: AddDeviceDto) {
        // @Request() req
        // const adminId = req.user.id;
        return this.deviceService.create(dto);
    }

    @Get('customer/:id')
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
        summary: 'Find Customer Details with entering the CUSTOMER_ID ',
        description: 'Find Customer Details with entering the CUSTOMER_ID ',
    })
    @ApiQuery({
        name: 'type',
        description: 'Type of customer details to fetch',
        enum: CustomerType,
        example: CustomerType.INFORMATION,
    })
    customer(@Param('id') id: string, @Query('type') type: CustomerType) {
        console.log('type', type);
        return this.deviceService.findCustomerDetails(id, type);
    }

    @Get('list')
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
        summary: 'find All devices',
        description: 'find devices',
    })
    @ApiQuery({
        name: 'page',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
    })
    find(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.deviceService.findDevice(page, limit);
    }

    @Patch('boxlock/:id')
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
        summary: 'update boxlock with entering the DEVICE_ID ',
        description: 'update boxlock with entering the DEVICE_ID',
    })
    updateBox(@Param('id') id: string, @Body() dto: UpdateBoxAndLockDto) {
        return this.deviceService.updateDeviceBoxLock(dto, id);
    }

    @Get(':id')
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
        summary: 'Find single Device Details with DEVICE_ID',
        description: 'Find single Device Details with DEVICE_ID',
    })
    getDeviceById(@Param('id') id: string) {
        return this.deviceService.getDeviceById(id);
    }

    @Patch(':id')
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
        summary: 'update device with entering the DEVICE_ID only',
        description: 'update device with entering the DEVICE_ID only',
    })
    update(@Param('id') id: string, @Body() dto: UpdateDeviceDto) {
        return this.deviceService.updateDevice(dto, id);
    }

    @Delete(':id')
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
        summary: 'Delete device with entering the DEVICE_ID only ',
        description: 'Delete device with entering the DEVICE_ID only ',
    })
    Delete(@Param('id') id: string) {
        return this.deviceService.deleteDevice(id);
    }
}

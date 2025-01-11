import { CustomerType } from '@common/helper/enums';
import { ApiError } from '@common/helper/error_description';
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
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeviceService } from '../device/device.service';
import { SubscriptionDto, updateSubscriptionDto } from './dto/subscribe.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
    constructor(private readonly subsService: SubscriptionService) {}

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
        summary: 'create subscription',
        description: 'create subscription',
    })
    create(@Body() dto: SubscriptionDto) {
        // @Request() req
        // const adminId = req.user.id;
        return this.subsService.create(dto);
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
        summary: 'remove subscription with entering the DEVICE_ID only',
        description: 'remove subscription with entering the DEVICE_ID only',
    })
    remove(@Param('id') id: string) {
        return this.subsService.removeSubscription(id);
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
        summary: 'update subscription with entering the DEVICE_ID only',
        description: 'update subscription with entering the DEVICE_ID only',
    })
    update(@Param('id') id: string, @Body() dto: updateSubscriptionDto) {
        return this.subsService.updateSubscription(dto, id);
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
        summary: 'find All subscribers',
        description: 'find subscribers',
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
        return this.subsService.findSubscription(page, limit);
    }
}

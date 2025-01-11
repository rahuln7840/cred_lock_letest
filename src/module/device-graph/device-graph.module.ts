import { Module } from '@nestjs/common';
import { DeviceGraphController } from './device-graph.controller';
import { DeviceGraphService } from './device-graph.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesSchema } from '../device/schemas/device.schema';
import { DevicesGraphSchema } from './schema/device.graph.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Device', schema: DevicesSchema },
            { name: 'DeviceGraph', schema: DevicesGraphSchema },
        ]),
    ],
    controllers: [DeviceGraphController],
    providers: [DeviceGraphService],
})
export class DeviceGraphModule {}

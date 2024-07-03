import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventProviders } from './event.providers';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [
    ...EventProviders, 
    EventService]
})
export class EventModule {}

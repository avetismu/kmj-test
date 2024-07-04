import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { time } from 'console';
import { Timezone } from '../../utils/enum.utils';
import { EventProviders } from './event.providers';
import { DatabaseModule } from '../../config/database.module';
import EventReponseDto from './dto/response-event.dto';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...EventProviders, EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });


  // Mock Test Data
  const eventData = {
    title: 'Test Event',
    description: 'Test Description',
    start: new Date(),
    end: new Date(),
    timezone: Timezone.GMT,
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Trivial create Test
  it('should create an event', async () => {
    expect(await service.create(eventData)).toBeInstanceOf(Object);
    }
  );

  // Trivial findAll Test
  it('should return an array of events', async () => {
    let events = await service.findAll();

    expect(events).toBeInstanceOf(Array);

    }
  );

  // Trivial findOne Test
  it('should return an event', async () => {
    let event = await service.create(eventData);

    let foundEvent = await service.findOne(event.uuid);

    expect(event).toBeInstanceOf(Object);
    expect(event.uuid).toBe(foundEvent.uuid);

    }
  );

});

import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { time } from 'console';
import { Timezone } from './utils/enum.utils';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService],
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

  // Trivial findAll Test
  it('should return an array of events', () => {
    expect(service.findAll()).toBeInstanceOf(Array);
    }
  );

  // Trivial create Test
  it('should create an event', () => {
    expect(service.create(eventData)).toBeInstanceOf(Object);
    }
  );

});

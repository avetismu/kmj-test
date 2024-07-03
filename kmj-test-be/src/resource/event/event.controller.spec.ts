import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Timezone } from './utils/enum.utils';
import { EventProviders } from './event.providers';
import { DatabaseModule } from '../../config/database.module';
import EventReponseDto from './dto/response-event.dto';

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [EventController],
      providers: [...EventProviders, EventService],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  // Trivial findAll Test
  it('should return an array of events', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Object);
    }
  );

  // Trivial create Test
  it('should create an event', async () => {

    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);
    }

  );

  // create Test with missing required fields in dto
  it('should return an error as dto is missing required fields', async () => {

    expect(await controller.create({
      title: null,
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(await controller.create({
      title: 'Test Event',
      description: null,
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: null,
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);
    
  
    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: null,
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: null,
    })).toBeInstanceOf(Object);

  })

  // test with various timezone values
  it('should return an error from the formatting of timzone property in DTO', async () => {

    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT+2' as Timezone,
    })).toBeInstanceOf(Object);

    expect(await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT-2' as Timezone,
    })).toBeInstanceOf(Object);

  });

  // create Test with misfomatted properties

  it('should return an error from the formatting of title', async () => {

    let response : EventReponseDto = await controller.create({
        title: 'This title is longer than 32 characters and should return an error',
        description: 'Test Description',
        start: new Date(),
        end: new Date(),
        timezone: 'GMT' as Timezone
      });

    expect(response).toBeInstanceOf(Object);
    expect(response.error).toBeDefined();

  });
  it('should return an error from the formatting of timzone property in DTO', async () => {

    let response : EventReponseDto = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'UTC' as Timezone,
    })

    expect(response).toBeInstanceOf(Object);
    expect(response.error).toBeDefined();

  });

  it('should return an error from end date being prior to start date', async () => {
      
    let response : EventReponseDto = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date('2021-01-01'),
      timezone: 'GMT' as Timezone,
    })
  
    expect(response).toBeInstanceOf(Object);
    expect(response.error).toBeDefined();

  });

});

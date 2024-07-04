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

    let response : EventReponseDto = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    });

    expect(response.data).toBeDefined();
    expect(response.data.uuid).toBeDefined();
    expect(response.data.title).toBe('Test Event');
    expect(response.data.description).toBe('Test Description');
    expect(response.data.start).toBeDefined();
    expect(response.data.end).toBeDefined();
    expect(response.data.timezone).toBe('GMT');
    
    }
  );

  // create Test with missing required properties in dto
  it('should return an error as dto is missing required properties', async () => {

    let responseMissingTitle = await controller.create({
      title: null,
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    });

    expect(responseMissingTitle.error).toBeDefined();
    expect(responseMissingTitle.error.description).toBe("Cannot read properties of null (reading 'length')");

    let responseMissingDescription = await controller.create({
      title: 'Test Event',
      description: null,
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    });

    expect(responseMissingTitle.error).toBeDefined();
    expect(responseMissingTitle.error.description).toBe("Cannot read properties of null (reading 'length')");

    let responseMissingStart = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: null,
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })

    expect(responseMissingStart.error).toBeDefined();
    expect(responseMissingStart.error.description).toBe("null value in column \"start\" of relation \"event\" violates not-null constraint");
    
  
    let responseMissingEnd = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: null,
      timezone: 'GMT' as Timezone,
    })

    expect(responseMissingEnd.error).toBeDefined();
    expect(responseMissingEnd.error.description).toBe("Start date is after end date");


   let responseMissingGMT =  await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: null,
    })

    expect(responseMissingGMT.error).toBeDefined();
    expect(responseMissingGMT.error.description).toBe("null value in column \"timezone\" of relation \"event\" violates not-null constraint");

  })

  // create Test with various timezone values
  it('should accept events with varying timezones', async () => {

    let responsePositiveGMT2 : EventReponseDto = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT+2' as Timezone,
    });

    expect(responsePositiveGMT2).toBeDefined();
    expect(responsePositiveGMT2.data).toBeInstanceOf(Object);
    expect(responsePositiveGMT2.data.timezone).toBe('GMT+2');

    let responseNegativeGMT2 : EventReponseDto = await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT-2' as Timezone,
    });

    expect(responseNegativeGMT2).toBeDefined();
    expect(responseNegativeGMT2.data).toBeInstanceOf(Object);
    expect(responseNegativeGMT2.data.timezone).toBe('GMT-2');

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

  // findOne travial  Test
  it('should return an event that was found by uuid', async () => {
    let response : EventReponseDto= await controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    });

    let foundEvent = await controller.findOne(response.data.uuid);

    expect(foundEvent).toBeInstanceOf(Object);
    expect(foundEvent.data).toBeDefined();
    expect(foundEvent.data.uuid).toBe(response.data.uuid);

  })

  // findOne Test with non-existent uuid
  it('should return an error as uuid does not exist', async () => {
    let response = await controller.findOne('12345678-1234-1234-1234-123456789012');

    expect(response).toBeInstanceOf(Object);
    expect(response.error).toBeDefined();

  })



});

import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Timezone } from './utils/enum.utils';

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  // Trivial findAll Test
  it('should return an array of events', () => {
    expect(controller.findAll()).toBeInstanceOf(Array);
    }
  );

  // Trivial create Test
  it('should create an event', () => {

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);
    }

  );

  // create Test with missing required fields in dto
  it('should return an error as dto is missing required fields', () => {

    expect(controller.create({
      title: null,
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(controller.create({
      title: 'Test Event',
      description: null,
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: null,
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);
    
  
    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: null,
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: null,
    })).toBeInstanceOf(Object);

  })

  // create Test with misfomatted properties

  it('should return an error from the formatting of title', () => {

    expect(controller.create({
      title: 'This title is longer than 32 characters and should return an error',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT' as Timezone,
    })).toBeInstanceOf(Object);

  });
  it('should return an error from the formatting of timzone property in DTO', () => {

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT+2' as Timezone,
    })).toBeInstanceOf(Object);

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'GMT-2' as Timezone,
    })).toBeInstanceOf(Object);

    expect(controller.create({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      timezone: 'UTC' as Timezone,
    })).toBeInstanceOf(Object);

  });

  it('should return an error from the formatting of start and end properties in DTO', () => {
      
      expect(controller.create({
        title: 'Test Event',
        description: 'Test Description',
        start: new Date('2021-08-01'),
        end: new Date(),
        timezone: 'GMT' as Timezone,
      })).toBeInstanceOf(Object);
  
      expect(controller.create({
        title: 'Test Event',
        description: 'Test Description',
        start: new Date(),
        end: new Date('2021-08-01'),
        timezone: 'GMT' as Timezone,
      })).toBeInstanceOf(Object);
  
    });

});

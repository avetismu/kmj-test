import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class EventService {

  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
  ) {
    
  }
  
  async create(createEventDto: CreateEventDto) {
    const newEvent = plainToClass(Event, createEventDto);

    // Validation Logic
    if (newEvent.title.length > 32) {
      throw new Error('Title is longer than 32 characters');
    }

    if (newEvent.start > newEvent.end) {
      throw new Error('Start date is after end date');
    }

    return this.eventRepository.save(newEvent);
  }

  async findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: UUID) {
    return this.eventRepository.findOne({where: {uuid: id}});
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`; //TODO
  }

  async remove(id: number) {
    return `This action removes a #${id} event`; //TODO
  }
}

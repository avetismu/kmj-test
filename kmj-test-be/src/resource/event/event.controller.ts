import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import EventReponseDto, { ERROR_CODE } from './dto/response-event.dto';
import { UUID } from 'crypto';
import { API_VERSION } from 'src/utils/app.constants.utils';

@Controller(API_VERSION + 'event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {

    try {
      const newEvent = await this.eventService.create(createEventDto);
      return {
        data : newEvent
      } as EventReponseDto
    }
    catch (error) {
      return {
        error: {
          code: ERROR_CODE,
          description: error.message
        }
      } as EventReponseDto
      
    }
  }

  @Get()
  async findAll() {

    try{
      const events = await this.eventService.findAll();
      return {
        data: events
      } as EventReponseDto
    }
    catch (error) {
      return {
        error: {
          code: ERROR_CODE,
          description: error.message
        }
      } as EventReponseDto
    }
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      const event = await this.eventService.findOne(id as UUID);

      if(event == null) {
        throw new Error('Event not found');
      }

      return {
        data: event
      } as EventReponseDto
    }
    catch (error) {
      return {
        error: {
          code: ERROR_CODE,
          description: error.message
        }
      } as EventReponseDto
    }
    
    }



  // TODO
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  // TODO
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}

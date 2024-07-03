import { DataSource } from "typeorm";
import { Event } from "./entities/event.entity";

export const EventProviders = [
    {
      provide: 'EVENT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
      inject: ['DATA_SOURCE'],
    },
  ];
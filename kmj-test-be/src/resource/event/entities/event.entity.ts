import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timezone } from "../../../utils/enum.utils";

@Entity('event')
export class Event {

    @PrimaryGeneratedColumn('uuid')
    uuid: UUID;

    @Column('varchar', {name: 'title', length: 32, nullable : false})
    title: string;

    @Column('text', {name: 'description', nullable : false})
    description: string;

    @Column('timestamptz', {'name': 'start', nullable : false})
    start: Date;

    @Column('timestamptz', {'name': 'end', nullable : false})
    end: Date;

    @Column('enum', {'name': 'timezone', 'enum': Timezone, 'default': Timezone.GMT, nullable : false})
    timezone: Timezone;
}

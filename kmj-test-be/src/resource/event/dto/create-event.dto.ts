import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Timezone } from '../../../utils/enum.utils';

export class CreateEventDto {
    @ApiProperty({type: String, nullable:false, default: 'Event Name', description: 'Title of the event'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({type: String, nullable:false, default: 'Event Description', description: 'Description of the event'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: Date, nullable:false, default: new Date(), description: 'Start date and time of the event'})
    @IsDate()
    start: Date;

    @ApiProperty({type: Date, nullable:false, default: new Date(), description: 'End date and time of the event'})
    @IsDate()
    end: Date;

    @ApiProperty({type: String, nullable:false, default: Timezone.GMT, description: 'Timezone of the event'})
    @IsEnum(Timezone)
    timezone: Timezone;
}
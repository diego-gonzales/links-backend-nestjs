import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type LinkDocument = Link & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Link {

    @Prop({required: true, trim: true})
    title: string;

    @Prop({required: true, trim: true})
    url: string;

    @Prop({required: true, trim: true})
    description: string;

};

export const LinkSchema = SchemaFactory.createForClass(Link);
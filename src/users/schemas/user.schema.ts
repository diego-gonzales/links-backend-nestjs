import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Link } from '../../links/schemas/link.schema';


export type UserDocument = User & Document;

@Schema({
    versionKey: false,
    timestamps: true
})
export class User {

    @Prop({required: true, trim: true})
    fullname: string;

    @Prop({required: true, trim: true})
    username: string;

    @Prop({required: true, minlength: 6})
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link', autopopulate: true }] })
    links: Link[];

};

export const UserSchema = SchemaFactory.createForClass(User);

// En vez de usar el plugin de esta manera, lo use en mi modulo con el forFeatureAsync (recomendado por docuemntacion)
// UserSchema.plugin(require('mongoose-autopopulate'));
import { IsMongoId } from "class-validator";

// Este Dto fue creado para poder mandar un id de algun link en un body, para que sea agregado a mi array de links 
export class LinkDto {
    @IsMongoId()
    link_id: string;
}
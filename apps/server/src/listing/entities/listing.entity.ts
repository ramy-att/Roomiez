import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CatDocument = HydratedDocument<Listing>;

@Schema()
export class Listing {

    @Prop()
    description: string;
  
    @Prop({ type: [String]})
    tags: string[];
  
    @Prop({ type: Types.ObjectId, ref: 'User' })
    owner: Types.ObjectId;
  
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    applicants: (Types.ObjectId)[];

    @Prop({default: 'available'})
    status: string

    @Prop()
    imageUrl: string
    @Prop()
    imageId : string

    @Prop()
    price: number 

    @Prop()
    location: string 
}

export const CatSchema = SchemaFactory.createForClass(Listing);

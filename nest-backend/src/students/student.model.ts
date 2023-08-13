/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
export enum Gender {
  Male = 'male',
  Female = 'female',
}
// export type StudentDocument =HydratedDocument<Student>;
@Schema()
export class Student  {
  @Prop({ required: true })
  Fname: string;
  @Prop({ required: true })
  Lname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  country: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

import {
  IsEmail,
  IsEnum,
  IsDateString,
  IsString,
  Validate,
} from "class-validator";
import { Gender } from "../../student.model";
import { AgeValidation } from "../../decorators/age-validation.decorator";

export class CreateStudentDto {
  @IsString()
  Fname: string;

  @IsString()
  Lname: string;

  @IsEmail()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  @Validate(AgeValidation)
  dateOfBirth: Date;

  @IsString()
  country: string;
}

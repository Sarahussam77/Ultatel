import {
  IsEmail,
  IsEnum,
  IsDateString,
  IsString,
  Validate,
  IsNotEmpty,
} from "class-validator";
import { Gender } from "../../student.model";
import { AgeValidation } from "../../decorators/age-validation.decorator";

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  Fname: string;

  @IsNotEmpty()
  @IsString()
  Lname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsDateString()
  @Validate(AgeValidation)
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  country: string;
}

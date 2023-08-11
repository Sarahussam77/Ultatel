import { IsString } from "class-validator";

export class UpdateStudentDto {
  @IsString()
  Fname: string;

  @IsString()
  Lname: string;

  @IsString()
  country: string;
}

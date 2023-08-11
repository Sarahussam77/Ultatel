import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto/create-student.dto";
import { Student } from "./student.model";
import { UpdateStudentDto } from "./dto/update-student.dto/update-student.dto";

@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post("create")
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Student> {
    return this.studentsService.findById(id);
  }

  @Patch(":id")
  async updateById(
    @Param("id") id: string,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.updateById(id, updateStudentDto);
  }

  @Delete(":id")
  async deleteById(@Param("id") id: string): Promise<void> {
    return this.studentsService.deleteById(id);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "./dto/create-student.dto/create-student.dto";
// import { StudentInterface } from './student.interface';
import { Student, StudentDocument } from "./student.model";
import { UpdateStudentDto } from "./dto/update-student.dto/update-student.dto";

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Check if the email already exists
    const existingStudent = await this.studentModel
      .findOne({ email: createStudentDto.email })
      .exec();

    if (existingStudent) {
      // Email already exists, throw an error
      throw new ConflictException({ message: "User already exists" });
    }

    // Email doesn't exist, create and save the student
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async updateById(
    id: string,
    updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .exec();
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return updatedStudent;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.studentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}

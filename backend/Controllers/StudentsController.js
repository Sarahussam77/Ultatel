let StudentsModel = require("../Models/studentsModel");
let checkStudent = require("../Utils/StudentValidate");
const dotenv = require("dotenv");
dotenv.config();



//# CRUDS regin

var AddNewStudent = async (req, res) => {
  try {
      const { Fname,Lname, email,gender,dateOfBirth,country } = req.body;

  // check if the Student already exists
      let foundedStudent = await StudentsModel.findOne({ email });
      if (foundedStudent) {
        return res.status(400).json({ message: "Student Already Exist" });
      }
    // Validate the incoming product data against the schema
      const { error, value } = checkStudent.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      } else {
        // add Student to database when it is valid
        await StudentsModel.create({
          Fname,
          Lname,
          email,
          gender,
          dateOfBirth,
          country
        });
        return res.json({ message: 'Your student added successfully', name: value.name });
      }
    
  } catch (e) {
    return res.status(400).json({ status: "failed" });
  }
};

var GetAllStudents = async (req, res) => {
  try {
    var AllStudents = await StudentsModel.find();
    await res.json(AllStudents);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get all Students");
  }
};

var GetStudentByID = async (req, res) => {
  try {
    var ID = req.params.id;
    res.json(await StudentsModel.findById(ID));
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get Student");
  }
};

//fix update
var UpdateStudentByID = async (req, res) => {
  const StudentId = req.params.id;
  const { Fname, Lname, country } = req.body;
  try {
    const updatedStudent = await StudentsModel.findByIdAndUpdate(
      StudentId,
      { $set: { Fname, Lname, country } },
      { new: true } 
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    return res.json({ message: 'Student updated successfully', Student: updatedStudent });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating Student' });
  }
};
var DeleteStudentByID = async (req, res) => {
  try {
    var ID = req.params.id;
    await StudentsModel.findByIdAndDelete(ID);
    res.send("Deleted Successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to delete Student");
  }
};



module.exports = {
  AddNewStudent,
  GetAllStudents,
  GetStudentByID,
  UpdateStudentByID,
  DeleteStudentByID
};



let StudentsModel = require("../Models/studentsModel");
let checkStudent = require("../Utils/StudentValidate");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

//#region multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // Filter only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024, // Maximum file size 1MB
  },
}).single('image');
// end region

//# CRUDS regin

var AddNewStudent = async (req, res) => {
  try {
    // upload the image 
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { Fname,Lname, email,gender,dateOfBirth } = req.body;


      let image = "";
      if (req.file) {
        image = req.file.path;
      }

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
          image,
        });
        return res.json({ message: 'Your student added successfully', name: value.name });
      }
    });
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
  try {
    var ID = req.params.id;
    var updatedStudent = req.body;
    console.log(updatedStudent)
    await StudentsModel.updateOne(
      { _id: ID },
      {
        Fname: updatedStudent.Fname,
        Lname: updatedStudent.Lname,
        
      }
    );
    await res.send(updatedStudent);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to update new Student");
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



//Registration
const StudentsController = require("../Controllers/StudentsController");
const express = require("express");
const router = new express.Router();

router.get("/",StudentsController.GetAllStudents);  //okay
router.get("/:id",StudentsController.GetStudentByID); //okay
router.post("/create",StudentsController.AddNewStudent); //okay
router.put("/:id",StudentsController.UpdateStudentByID); //not okay
router.delete("/:id",StudentsController.DeleteStudentByID);//okay


module.exports = router;

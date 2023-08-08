const mongoose = require("mongoose");
var validator = require("validator");
// call database to connect
const connectToDatabase = require("../Utils/databaseConfig");
// Student schema
let StudentsSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true,
        

    },
    Lname: {
        type: String,
        required: true,
        

    }
    ,

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => {
                validator.isEmail(val);
            },
            message: (props) => `${props.value} is not a valid Email !`,
        },
    },
    gender: {
        type: String, 
        enum: ['male', 'female'], 
    },
    dateOfBirth: {
        type: Date, 
    },

    image:{
        type:String,
    }


});


const Student = connectToDatabase().model("Students", StudentsSchema);

module.exports = Student;
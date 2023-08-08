const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");
// call database to connect
const connectToDatabase = require("../Utils/databaseConfig");
// user schema
let UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return /^[a-zA-Z\s]{3,30}$/i.test(val);
            },
            message: (props) => `${props.value} is not a valid name !`,
        },

    },

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

    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        validate: {
            validator: (val) => {
                if (!val || val.trim() === "") {
                    return true; //allow empty phone number
                } else {
                    return /^01[0125][0-9]{8}$/.test(val);
                }
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    image:{
        type:String,
    }

});
// function to hash password after add to database
UsersSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            })
            .catch(error => {
                next(error);
            });
    } else {
        next();
    }
});


const User = connectToDatabase().model("Users", UsersSchema);

module.exports = User;
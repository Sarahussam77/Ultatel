const Joi = require('joi');
// validation to user data
const userSchema = Joi.object({
  Fname: Joi.string().max(30).required(),
  Lname: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.date().required(),
  image: Joi.string().regex(/\.(jpg|jpeg|png)$/).required() ,
  country: Joi.string().required()
});
module.exports = userSchema;
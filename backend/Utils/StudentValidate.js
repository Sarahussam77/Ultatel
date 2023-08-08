const Joi = require('joi');
// validation to user data
const userSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
  image: Joi.string().regex(/\.(jpg|jpeg|png)$/) 
});
module.exports = userSchema;
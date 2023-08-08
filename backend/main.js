
const express = require("express");
const app = express();
const cors = require("cors");
// enable all CORS requests
app.use(cors());
const PORT = 7400;
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
require("dotenv").config();


//====================For Regestration===================
const UserRoutes = require("./Routes/StudentsRoutes");




app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});



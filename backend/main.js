
const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");
// enable all CORS requests
app.use(cors());
const PORT = 7400;
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
require("dotenv").config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//====================For Regestration===================
const UserRoutes = require("./Routes/StudentsRoutes");
app.use("/api/students", UserRoutes);



app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});



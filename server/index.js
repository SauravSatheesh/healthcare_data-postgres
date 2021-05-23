const express= require("express");
const routerPatient=require("./routes/patient");
const routerClient=require("./routes/client");
const cors = require("cors");
require("dotenv").config();
const pool= require("./db");

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api/patients',routerPatient);
app.use('/api/clients',routerClient);

const PORT =process.env.PORT ||5000;
app.listen(PORT,()=>console.log(`Server connected to port:http://localhost:${PORT}`));
   
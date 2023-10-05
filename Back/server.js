const express = require('express');
const ConnectDB = require('./Config/ConnectDB');
const carsRouter = require('./Routes/Cars');
const userRouter = require('./Routes/Users');
const path = require('path')
require('dotenv').config()

const app = express();

const cors = require('cors');
app.use(cors());


const port = 5000 ;

ConnectDB()
app.use(express.json())
 
app.use('/api/cars',carsRouter)
app.use('/api/user',userRouter)
app.use("/api/uploads", require("./Routes/UploadRoute"));
app.use("/uploads", express.static(path.join(__dirname, "./images")));

app.listen(port,console.log('server is running on port ',port))
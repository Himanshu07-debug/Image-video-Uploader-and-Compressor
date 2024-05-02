const express = require('express');

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;


app.use(express.json());

const fileUpload = require("express-fileupload");     

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'        
})); 



const dbConnect = require("./config/database");

dbConnect();

// Connecting to cloud
const cloudinary = require("./config/cloudinary");

cloudinary.cloudinaryConnect();


// Routes
const Upload = require("./routes/fileUpload");

app.use("/api/v1/",Upload);


app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
});

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
});


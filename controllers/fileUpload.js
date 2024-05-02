const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

// local file Upload ---------------->>

exports.localFileUpload = async (req,res) => {
    try{

        // fetch the file from the req.body of the post request
        const file = req.files.file;     
        // req.files is the part of hierarchy for fetching file
        console.log("File Fetched -> ",file);

        // create path where the fetched file will be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;  
        // In order to get extension -> 2 part me krnga split function, humko second part chahiye (index 1)
                                                                                    

        console.log("Path -> ",path);

        // add path to the move function(mv) inorder to move the file to the respective path
        file.mv(path,(err)=>{
            if(err){
                console.log("Error while moving the File ",err);
                return res.status(401).json({
                    success:false,
                    message:err.message,
                })
            }
            
        });

        res.json({
            success: true,
            message:"Local file Uploaded successfully"
        })


    }
    catch(err){
        console.log("Not able to upload file on server");
        console.log(err);
    }
}




// FUNCTIONS:

// Function for uploading file to Cloudinary:
async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("Temp path: ", file.tempFilePath);

    // IMP to check this becz imageUplaod and videoUplaod handler me quality pass nhi kar rhe
    if(quality){    
        options.quality=quality;
    }

    // Allowing options to detect the type of file by its own
    options.resource_type = "auto";   // v.v.imp line while uploading in cloudinary ( documentation se dekhe)
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}


function isFileSupported(fileTypes,supportedTypes) {
    return supportedTypes.includes(fileTypes);
}

function isSmaller(file){
    return file.size < 5242880;   // Checking file.size is less than 5MB or not
}

// Image Upload

exports.imageUpload = async (req,res) => {
    try{

        // data fetch ( refer schema)
        const {name,tags,email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpeg","png","jpg"];
        const fileTypes = file.name.split(".")[1].toLowerCase();
        console.log("File type -> ",fileTypes);


        if( !isSmaller(file) ||  !isFileSupported(fileTypes,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file,"Backend");   


        console.log(response);

        // db me entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,   

        })

        res.json({
            success: true,
            data : fileData,
            message:"Image uploaded successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message : "Error in uploading image"
        })

    }
}




// Video upload handler
exports.videoUpload = async (req,res) =>{

    try{

        // data fetch ( refer schema)
        const {name,tags,email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        
        // Validation
        const supportedTypes = ["mp4","mov"];
        const fileTypes = file.name.split(".")[1].toLowerCase();
        console.log("File type -> ",fileTypes);

        if(!isFileSupported(fileTypes,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"Backend");   
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,   
        })

        
        res.json({
            success: true,
            data : fileData,
            message:"Video uploaded successfully"
        })

    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message : "Error in uploading Video"
        })
    }

}


// Image size reducer -> Go to Cloudinary documentation Optimization section

exports.imageFileReducer = async (req,res) => {
    try{

        // data fetch ( refer schema)
        const {name,tags,email} = req.body;
        console.log(name, tags, email);

        const file = req.files.reduceImageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpeg","png","jpg"];
        const fileTypes = file.name.split(".")[1].toLowerCase();
        console.log("File type -> ",fileTypes);


        if( !isSmaller(file) ||  !isFileSupported(fileTypes,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"Backend",50);  // sending Quality as 50% to reduce the size of the file

        // you can reduce the height width to reduce the size

        console.log(response);


        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,   
        })

        res.json({
            success: true,
            data : fileData,
            message:"Image uploaded successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message : "Error in uploading image"
        })

    }
}

const mongoose = require('mongoose');


const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});



// POST middlware
fileSchema.post('save', async function(doc){

    try{

            // This doc is the new document that entered in your database collection
            console.log("DOC: ",doc);


            // transporter
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,

                }
            });

            // send mail
            let info = await transporter.sendMail({
                from:`Himanshu`,
                to:doc.email,
                subject:"New File Uploaded on Cloudinary",
                html:`<h2>Hello!</h2> <p>FileUploaded , View Here <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`
            })

            console.log("INFO : ", info);

    }
    catch(err){
        console.log(err);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;
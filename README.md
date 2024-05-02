# Image Video Uploader and Compressor

Welcome to the File Upload Backend Project! This project provides a backend system for uploading files to cloud storage, along with additional features for compression and email notifications.

## Features

- **File Upload:** Upload various types of files including images and videos to cloud storage.
- **Compression:** Compress images and videos to optimize storage and bandwidth usage.
- **Email Notifications:** Send email notifications using nodemailer upon successful file uploads.

## Technologies Used

- **Node.js:** Backend runtime environment for executing JavaScript code.
- **Express.js:** Web application framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing file metadata and user information.
- **Cloudinary:** Cloud storage service for storing and managing uploaded files.
- **Nodemailer:** Module for sending email notifications.
- **Mongoose:** MongoDB object modeling tool for Node.js.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/file-upload-backend.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in the `.env` file:
     ```
     MONGODB_URI=your_mongodb_connection_string
     MAIL_HOST=your_email_host
     MAIL_USER=your_email_username
     MAIL_PASS=your_email_password
     CLOUD_NAME=your_cloudinary_account_name
     API_KEY=your_cloudinary_API_key
     API_SECRET=your_cloudinary_password
     ```
  - For Cloudinary part, Refer Cloudinary Documentation
  - For Gmail part, see how to use nodemailer with Gmail
     
4. Run the server: `npm start`
5. The server will start running at `http://localhost:3000`.

## Usage

- **Local File Upload:** Use the `/localFileUpload` endpoint to upload files to the server.
- **Image Upload:** Use the `/imageUpload` endpoint to upload images to cloud storage.
- **Video Upload:** Use the `/videoUpload` endpoint to upload videos to cloud storage.
- **Image File Reduction:** Use the `/imageFileReducer` endpoint to compress and upload images to cloud storage.

## Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the creators of the technologies and libraries used in this project.


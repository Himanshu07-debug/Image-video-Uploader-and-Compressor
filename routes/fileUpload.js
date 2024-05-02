const express = require('express');

const router = express.Router();

const {localFileUpload, imageUpload, videoUpload, imageFileReducer} = require("../controllers/fileUpload");

// api route
router.post("/localFileUpload",localFileUpload); // server pe upload

router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageFileReducer",imageFileReducer);

module.exports = router;
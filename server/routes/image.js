import express from "express";
import ExpressFormidable from "express-formidable";
import multer from "multer";
import { imageUploadController } from "../controller/ImageUpload.js";
const router = express.Router();

router.post(
    "/image-upload",
    ExpressFormidable({ maxFileSize: 5 * 1024 * 1024 }),
    imageUploadController
);

export default router;
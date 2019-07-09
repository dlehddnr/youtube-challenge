import express from "express";
import { home, upload } from "./controller";
import multer from "multer";

export const globalRouter = express.Router();

const multerText = multer({ dest: "upload/" });
const uploadText = multerText.single("txt");

globalRouter.get("/", home);
globalRouter.post("/", uploadText, upload);

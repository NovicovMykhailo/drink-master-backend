import path from "path";
import multer from "multer";

const tempDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({ storage: multerConfig });

const limits = {
  fileSize: 1024 * 1024 * 4,
};

export default upload;
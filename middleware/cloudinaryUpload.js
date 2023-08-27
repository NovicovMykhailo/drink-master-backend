
// router.patch('/user/update', authenticate, upload.single('avatar'), ctrl.updateUser);
// router.post('/own', authenticate, upload.single('recipeImg'), ctrl.add Recipe);

import { v2 as cloudinary } from 'cloudinary';
import  { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file properties or request data
    let folder;
    if (file.fieldname === 'avatarURL') {
      folder = 'avatars';
    } else if (file.fieldname === 'recipeImg') {
      folder = 'resipiesImgs';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
      public_id: file.originalname, // Use original filename as the public ID
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

export default upload

;
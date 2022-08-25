import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

// Multer middleware is used to upload file to mongodb before checking out
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${username}:${password}@blog-app.v73rxj9.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const fileType = ["image/png", "image/jpg"];

    if (fileType.indexOf(file.memeType) === -1) {
      // to avoid duplicacy of filename we have concatenated current date with its original name
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });

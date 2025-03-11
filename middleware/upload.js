/* // middleware/Upload.js
import multer from "multer";
import path from "path";
import fs from 'fs';
import ImageModel from '../models/ImageModel.js'; 

// Zielverzeichnis für Uploads
const uploadDir = './public/uploads';

// Stelle sicher, dass das Upload-Verzeichnis existiert
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Erstelle das Verzeichnis, wenn es nicht existiert
}

// Multer-Konfiguration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');  // Zielverzeichnis für Dateien
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Dateiname mit Zeitstempel
  }
});


//const images = mongoose.model("images");
const upload = multer({ storage: storage });


// Exportiere eine Funktion, die die Upload-Route hinzufügt

  

  // Exportiere eine Funktion, die die Upload-Route hinzufügt
  const addUploadRoute = (app) => {
    app.post('/upload-image', upload.single('image'), async (req, res) => {
      try {
        const imageName = req.file.filename;
        console.log(req.file);  // Datei-Informationen
        await ImageModel.create({ image: imageName });
        res.json({ msg: 'File uploaded successfully', file: req.file });
      } catch (error) {
        res.status(500).json({ msg: 'Error uploading file', error: error.message });
      }
    });
  };

export default addUploadRoute;
 */

// middleware/Upload.js
import multer from "multer";
import path from "path";
import fs from 'fs';
import ImageModel from '../models/ImageModel.js';
import mongoose from "mongoose";

const ALLOWED_EXT = ['jpg', 'jpeg', 'webp', 'avif', 'png', 'pdf'];
const ALLOWED_SIZE = 1_048_576 * 6; // 2mb

// Zielverzeichnis für Uploads
const uploadDir = './public/images';
const documentDir = './public/documents/';


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(documentDir)) {
  fs.mkdirSync(documentDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {


    if (file.mimetype.startsWith('image')) {
      cb(null, uploadDir);
    } else if (file.mimetype.startsWith('application')) {

      cb(null, documentDir);
    } else {
      cb(new Error('File type not supported'), false);
    }

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const fileExt = file.mimetype.split('/')[1];

  if (!ALLOWED_EXT.includes(fileExt)) {
    
    const err = new Error(`Wrong file type`);
    err.statusCode = 400;
    cb(err);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage ,fileFilter, limits:{fileSize:ALLOWED_SIZE}});


const addUploadRoute = (app) => {
  app.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
      console.log("req.file:", req.file);

      const fileData = req.file;

      const image = await ImageModel.create({
        fieldname: fileData.fieldname,
        originalname: fileData.originalname,
        encoding: fileData.encoding,
        mimetype: fileData.mimetype,
        destination: fileData.destination,
        filename: fileData.filename,
        path: fileData.path,
        size: fileData.size,

      });

      res.json({
        msg: "File uploaded successfully",
        file: fileData,
      });
    } catch (error) {
      console.error("Fehler beim Hochladen der Datei:", error);
      res.status(500).json({ msg: "Error uploading file", error: error.message });
    }
  });
};


export default addUploadRoute;




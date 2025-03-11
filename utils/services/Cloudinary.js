import { v2 as cloudinary } from 'cloudinary';

// cloudinary Methoden lassen sich nur nutzen, wenn eine CLOUDINARY_URL in den Umgebungsvariablen (.env) vorhanden ist

class CloudinaryStorage {
  _handleFile(req, file, cb) {
    // der Stream
    const cloudinaryUpload = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      // Wenn Fehler Weitergabe an Error Handler
      if (error) cb(error);

      // Wenn Upload erfolgreich, hängt dies ein 'result'-Feld an req.file an
      cb(null, { result });
    });

    // nimmt die eingehenden Dateien und streamt sie weiter an Cloudinary
    file.stream.pipe(cloudinaryUpload);
  }
}

export default CloudinaryStorage;
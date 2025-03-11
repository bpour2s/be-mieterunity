import { Schema, model} from 'mongoose';

const ImageSchema = new Schema(
    {
       fieldname: {
        type: String, 
       },
      
       originalname:{
        type: String,
       },
       encoding: {
        type: String,
       },
       mimetype: {
        type: String,
       },
       destination: {
        type: String,
       },
       filename: {
        type: String,
       },
       path: {
        type: String,
       },
       size: {
        type: Number,
       } },
       {
         timestamps: true,
       }
       
);
export const ImageModel = model("images", ImageSchema);
export default ImageModel;




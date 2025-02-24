import { required } from 'joi';
import { Schema, model } from 'monngoose';

const FileSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true

    },

    originalFileName: {
        type: String,
        trim: true,

    },

    storedFileName: {
        type: String,
        required: true,
        trim: true
    },

    mimeType: {
        type: String,
        required: true,
        trim: true
    },

    icon: {
        type: String,
        trim: true,
    },

    createdByUserId: {

        type: Schema.Types.objectId,
        ref: 'User',
        required: true
    },
},
    {
        timestamps: true,
    });

const File = model('File', FileSchema);
export default File;




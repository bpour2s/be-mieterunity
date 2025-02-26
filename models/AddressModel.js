import { Schema, model } from 'mongoose';

const AdressSchema = new Schema({

    street: {
        type: String,
        required: true,
        trime: true
    },

    housNr: {
        type: String,
        required: true,
        trim: true

    },

    postalCode: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    country: {
        type: String,
        default: 'Germany',
        trim: true

    },

    lon: {
        type: Number,
        required: true
    },

    lan: {
        type: Number,
        required: true
    },
}, {

    timestamps: true,
});

const Address = model('Adress', AdressSchema);
export default Address;


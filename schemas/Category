import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({

    categpoyId: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Category = model('Category', CategorySchema);
export default Category;

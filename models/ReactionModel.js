import { Schema, model } from 'mongoose';

const ReactionSChema = new Schema({

    symbol: {
        type: String,
        trim: true
    },
    count: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true
    });


const Reaction = model('Reaction', ReactionSChema);
export default Reaction; 
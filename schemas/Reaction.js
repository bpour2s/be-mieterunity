import {Schema, model} from 'mongoose';

const ReactionSChema = new Schema({

    symbol: {
        type: String,
        trim: true
    },
 },{
        timestamps: true
    
});


const Reaction = model('Reaction', ReactionSChema);
export default Reaction; 
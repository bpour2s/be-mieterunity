import { required } from 'joi';
import { Schema, model } from 'mongoose';

const MassageSchema = new Schema({
    message: String,
    fromUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    toUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    reactions: [{

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',

        },

        status: {
            type: String,
            enum: ['unread', 'read', 'seen', 'not_seen', 'answered', 'not_answered'],
            default: 'unread'
        },
    }],
}, {
    
    timestaps: true,
    
});

const Massage = model('Massage', MassageSchema);
export default Massage;



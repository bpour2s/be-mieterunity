
import { Schema, model } from 'mongoose';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlPattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const UserSchema = new Schema({

    isFirstLogin: {
        type: Boolean,
        default: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role', // Verweist auf das Role-Modell
       // required: true
    },
    firstName: String,
    lastName: String,

    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique:[true, 'Email already in use'],
        match: [emailPattern, 'Email not valid'],
    },

    password: {
        type: String,
        required: true,
        match: [passwordPattern, 'Please provide a proper password'],
    },

    locations: [{
        addressId: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }
    }],

    tokens: [{
        accessToken: {
            type: String,
            required: true
        }
    }],

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    images: {
        type: String,
        default:
            'https://res.cloudinary.com/dvniua4ab/image/upload/c_crop,h_200,q_63,r_30,w_200/v1738597956/doh3dd3gliqihwvudapz.avif',
        match: [urlPattern, 'Please provide a proper URL'],

    },
    threads: [{
        threadId: {
            type: Schema.Types.ObjectId,
            ref: 'Thread' // Verweist auf das Thread-Modell
        }
    }],
    profilImageId: {
        type: Schema.Types.ObjectId,
        ref: 'File' // Verweist auf das File-Modell
    },

    isAccountDeleted: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true 
});


const User = model('User', UserSchema);
export default User;
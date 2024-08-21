
import  { model, Schema } from 'mongoose';

const usersSchema = new Schema({
name: {
    type: String,
    required: true,
},
email: {
    type: String,
    unique: true,
    required: true,
},

},
{required: true,
    timestamps:true,
}
);

export const UsersCollection = model('users', usersSchema);

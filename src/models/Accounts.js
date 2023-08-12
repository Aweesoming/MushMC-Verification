import { Schema, model } from 'mongoose';

const AccountsSchema = new Schema({
    nick: {
        type: String,
    },
    isPirate: {
        type: Boolean,
    },
    userId: {
        type: String
    },
    role: {
        type: String
    }
})
export default model('Accounts', AccountsSchema)
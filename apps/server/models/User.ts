import {Schema, model, Document } from 'mongoose';
import bcrypt = require('bcryptjs');
import {User} from "../types";

interface UserDocument extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

export default model<UserDocument>('User', UserSchema);

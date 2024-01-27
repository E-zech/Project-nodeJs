import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Name } from "./shared/Name.js";
import { Address } from "./shared/Address.js";
import { Image } from "./shared/Image.js";

const userSchema = new mongoose.Schema({
    name: Name,

    isAdmin: {
        type: Boolean,
        default: false,
    },

    isBusiness: {
        type: Boolean,
        default: false,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
    },

    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        lowercase: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/,
    },

    address: Address,

    image: Image,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        user.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model("users", userSchema);
export default User;




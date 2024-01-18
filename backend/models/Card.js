import mongoose from 'mongoose';
import { Types } from "mongoose";
import { Image } from "./shared/Image.js";
import { Address } from "./shared/Address.js";



function randomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
};

const cardSchema = new mongoose.Schema({

    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },

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
    },

    web: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/,
    },

    image: Image,

    address: Address,

    bizNumber: { type: Number, default: randomNumber, trim: true },

    likes: [String],


    userId: {
        type: Types.ObjectId,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

cardSchema.pre('save', function (next) {
    if (this.isNew) {
        this.bizNumber = randomNumber();
    }
    next();
});


const Card = mongoose.model('cards', cardSchema);

export default Card;

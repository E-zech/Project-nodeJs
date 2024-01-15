import mongoose from 'mongoose';

export const Image = new mongoose.Schema({
    url: {
        type: String,
        allow: (""),
        match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/
    },
    alt: { type: String, allow: (""), }
});
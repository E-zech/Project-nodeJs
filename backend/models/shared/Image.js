import mongoose from 'mongoose';

export const Image = new mongoose.Schema({
    url: {
        type: String,
        allow: (""),
    },
    alt: { type: String, allow: ("") }
});
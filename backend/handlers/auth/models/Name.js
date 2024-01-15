import mongoose from 'mongoose';

export const Name = new mongoose.Schema({
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true },
});


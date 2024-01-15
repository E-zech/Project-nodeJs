import mongoose from 'mongoose';

export const Address = new mongoose.Schema({
    state: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: Number, required: true }
});

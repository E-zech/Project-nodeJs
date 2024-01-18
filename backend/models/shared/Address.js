import mongoose from 'mongoose';

export const Address = new mongoose.Schema({
    state: { type: String, allow: ("") },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: Number, min: 0, max: 99999, default: 0 }
});

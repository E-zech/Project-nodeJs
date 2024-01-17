import Joi from 'joi';

export const CardValid = Joi.object({

    title: Joi.string().min(2).max(30).required(),
    subtitle: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(10).max(200).required(),

    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('phone must be 9 digits long').required(),

    email: Joi.string().email().lowercase().trim().required(),

    web: Joi.string().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/).required(),

    image: Joi.object({
        url: Joi.string().pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/).allow(""),
        alt: Joi.string().min(5).max(200).allow(""),
    }).required(),

    address: Joi.object({
        state: Joi.string().min(2).max(30).allow(''),
        country: Joi.string().min(2).max(30).required(),
        city: Joi.string().min(2).max(30).required(),
        street: Joi.string().min(2).max(30).required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().allow(''),
    }).required(),

    bizNumber: Joi.number(),
    likes: Joi.array().default([]),
    userId: Joi.string(),
    createdAt: Joi.date(),
});

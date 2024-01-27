import Joi from 'joi';

export const CardValid = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    subtitle: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(10).max(200).required(),

    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('phone must be 9 digits long').required(),

    email: Joi.string().email().lowercase().trim().required(),

    web: Joi.string().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/).required(),

    image: Joi.object({
        url: Joi.string().uri().allow(""),
        alt: Joi.string().min(5).max(200).allow(""),
    }).required(),

    address: Joi.object({
        state: Joi.string().min(2).max(56).allow(''),
        country: Joi.string().min(2).max(56).label('country').required(),
        city: Joi.string().label('city').required(),
        street: Joi.string().label('street').required(),
        houseNumber: Joi.number().label('houseNumber').required(),
        zip: Joi.number().allow(''),
    }).required(),

    bizNumber: Joi.number(),
    likes: Joi.array().default([]),
    userId: Joi.string(),
    createdAt: Joi.date(),
});

export const bizNumberValid = Joi.object({
    bizNumber: Joi.number()
        .integer()
        .min(100000)
        .max(999999)
        .messages({
            'number.base': 'bizNumber must be a numeric value',
            'number.integer': 'bizNumber must be an integer',
            'number.min': 'bizNumber must be equal to a 6-digit number',
            'number.max': 'bizNumber must be equal to a 6-digit number',
        }),
});

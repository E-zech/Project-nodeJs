import Joi from 'joi';

export const UserValid = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).max(20).label('first name').required(),
        middle: Joi.string().allow(''),
        last: Joi.string().min(2).max(20).label('last name').required(),
    }).required(),

    isAdmin: Joi.boolean().default(false),
    isBusiness: Joi.boolean().default(false).required(),

    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('phone must be 9 digits long').required(),

    email: Joi.string().email().lowercase().trim().required(),

    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).message('password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.').required(),

    address: Joi.object({
        state: Joi.string().min(2).max(56).allow(''),
        country: Joi.string().min(2).max(56).label('country').required(),
        city: Joi.string().label('city').required(),
        street: Joi.string().label('street').required(),
        houseNumber: Joi.number().min(1).label('houseNumber').required(),
        zip: Joi.number().allow(''),
    }).required(),

    image: Joi.object({
        url: Joi.string().uri().allow(""),
        alt: Joi.string().allow(""),
    }).required(),
});

export const userLoginValidation = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).required(),
});






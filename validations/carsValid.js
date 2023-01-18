// company: String,
// model: String,
// year: String,
// img: String,
// price: Number,
// description: String,
// videoLink: String,
// dateCreated: {
//     type: Date,
//     default: (Date.now() + 2 * 60 * 60 * 1000)
// },
// user_id: {
//     type: mongoose.Types.ObjectId,
//     ref: 'users'
// }

import Joi from 'joi'

export const carValidation = (_bodyData) => {
    const validation = Joi.object({
        company: Joi.string().required().max(25),
        model: Joi.string().required().max(25),
        year: Joi.string().required().max(4),
        img: Joi.string().required().max(2000),
        price: Joi.number().required().min(0).max(10000000),
        description: Joi.string().required().max(500),
        videoLink: Joi.string().required().max(500)
    });
    return validation.validate(_bodyData);
}
export const carUpdateValidation = (_bodyData) => {
    const validation = Joi.object({
        company: Joi.string().allow().max(25).min(2),
        model: Joi.string().allow().max(25).min(2),
        year: Joi.string().allow().max(4),
        img: Joi.string().allow().max(2000),
        price: Joi.number().allow().min(0).max(10000000),
        description: Joi.string().allow().max(500),
        videoLink: Joi.string().allow().max(500)
    });
    return validation.validate(_bodyData);
}
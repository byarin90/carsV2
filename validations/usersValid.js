import Joi from 'joi'

export const addUserValid = (_bodyData) => {
    //Create Validation to Add User by Types and By length and if Required or not
    const validation = Joi.object({
        fullName: {
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(2).max(30).required(),
        },
        password: Joi.string().min(6).max(30).required(),
        email: Joi.string().email().required(),
        profileImg: Joi.string().allow("", null).max(1000)
    });

    //return object if the object return obj.error than i have error 
    return validation.validate(_bodyData);
}
export const loginValid = (_bodyData) => {
    //Login Validation to Add User by Types and By length and if Required or not
    const validation = Joi.object({
        password: Joi.string().min(6).max(30).required(),
        email: Joi.string().email().required()
    });

    //return object if the object return obj.error than i have error 
    return validation.validate(_bodyData);
}
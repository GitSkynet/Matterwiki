const Joi = require('@hapi/joi')

const { modelValidationWrapper } = require('../common/utils/index')

exports.UserValidator = modelValidationWrapper(
    Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        // TODO: Password limitations
        password: Joi.string().required(),
        about: Joi.string().min(10).max(255).allow('').optional(),
    }),
)

exports.UserUpdateValidator = modelValidationWrapper(
    Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        // TODO: Password limitations
        password: Joi.string(),
        about: Joi.string().min(10).max(255).allow('').optional(),
    }),
)

exports.LoginValidator = modelValidationWrapper(
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
)
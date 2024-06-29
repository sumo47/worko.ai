const Joi = require('joi')

// User
module.exports.UserJoi = Joi.object({

    Email: Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    Name: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid fname"),

    Age: Joi.number().integer().strict().required(),

    City: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid city name"),

    Zip_code: Joi.number().integer().strict().required(),

    password: Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one upper case one lower case one special character and one numerical value"),
})

module.exports.loginJoi = Joi.object({

    Email: Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    password: Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one upper case one lower case one special character and one numerical value")

})

module.exports.UpdateJoi = Joi.object({
    Email: Joi.string().trim().optional().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    Name: Joi.string().trim().optional().regex(/^[a-zA-Z ]+$/).message("please provide valid fname"),

    Age: Joi.number().integer().strict().optional(),

    City: Joi.string().trim().optional().regex(/^[a-zA-Z ]+$/).message("please provide valid city name"),

    Zip_code: Joi.number().integer().strict().optional(),

    password: Joi.string().trim().optional().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one upper case one lower case one special character and one numerical value"),
})
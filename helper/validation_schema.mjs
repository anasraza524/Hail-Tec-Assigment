import  Joi from 'joi';


export const signupSchema = Joi.object({
    fullName:Joi.string().required(),
    age:Joi.string().required(),
    email:Joi.string().email().lowercase().required(),
    // number:Joi.number().required(),
    
    password:Joi.string().required(),
    // isAdmin:Joi.boolean().invalid(true),
})

export const loginSchema = Joi.object({
   
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().required(),
})

export const forgetPasswordSchema = Joi.object({
   
    email:Joi.string().email().lowercase().required(),
   
})
export const resetPasswordSchema = Joi.object({
   
   
    password:Joi.string().required(),
})

export const productSchema = Joi.object({
   
    name: Joi.string().required(),
    priceUnit:Joi.string().required(),
    price:Joi.number().required() ,
    description:Joi.string().required() ,
    productType:Joi.string().required(),
    //  productImage:Joi.required() ,
    
})

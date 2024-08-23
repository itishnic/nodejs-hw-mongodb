import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid('home', 'personal', 'other').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('home', 'personal', 'other'),
});

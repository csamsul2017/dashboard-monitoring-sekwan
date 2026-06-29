import Joi from 'joi';
import { InvariantError } from '../exceptions/index.js';

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
    nip: Joi.string().optional(),
    roleId: Joi.number().integer().optional(),
    deptId: Joi.number().integer().optional(),
    isActive: Joi.bool().required(),
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new InvariantError(error.details[0].message));
  }

  next();
};

export default validateUser;

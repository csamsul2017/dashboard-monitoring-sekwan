import Joi from 'joi';
import { InvariantError } from '../exceptions/index.js';

const validateUpdateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).messages({
      'string.base': 'Name must be a string',
    }),
    nip: Joi.string().optional(),
    roleId: Joi.number().integer().optional(),
    deptId: Joi.number().integer().optional(),
    status: Joi.number().integer().optional(),
    email: Joi.string().email().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(6).messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 6 characters',
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new InvariantError(error.details[0].message));
  }

  next();
};

export default validateUpdateUser;

import Joi from "joi";
import { InvariantError } from "../exceptions/index.js";

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new InvariantError(error.details[0].message));
  }

  next();
};

export default validateLogin;

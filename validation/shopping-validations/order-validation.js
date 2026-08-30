const Joi = require("joi");

const orderIdSchema = Joi.string().hex().length(24).required();

module.exports = {
  orderIdSchema,
};

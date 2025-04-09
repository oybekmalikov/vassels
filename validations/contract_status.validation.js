const Joi = require("joi");
exports.contractStatusValidation = (body) => {
  const contractStatusValid = Joi.object({
    id: Joi.number(),
    name: Joi.string().max(100).required().messages({
      "string.base": "Contract Status name was entered incorrectly",
      "string.max": "Contract Status name must be lower than 100 characters",
      "any.required": "Contract Status name is required",
    }),
    description: Joi.string().optional(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return contractStatusValid.validate(body, { abortEarly: false });
};

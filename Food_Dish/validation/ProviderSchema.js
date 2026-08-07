// external module

import Joi from "joi"

//validation

export const providerSchema = Joi.object({
  providerName: Joi.string().length(24).required().messages({
    "string.hex": "Invalid Provider User Id",
    "string.length": "Provider User Id must be 24 characters",
    "any.required": "Provider User Id is required",
  }),

  restaurantName: Joi.string().length(24).required().messages({
    "string.hex": "Invalid Restaurant Id",
    "string.length": "Restaurant Id must be 24 characters",
    "any.required": "Restaurant Id is required",
  }),

  document: Joi.string().required().messages({
    "string.base": "Document must be a string",
    "any.required": "Document is required",
  }),

  bankNumber: Joi.string()
    .pattern(/^\d{9,18}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Bank account number must be between 9 and 18 digits",
      "any.required": "Bank account number is required",
    }),

  isVerified: Joi.boolean().default(false),

  Cloudinary_Id: Joi.string().optional(),
});

export const updateProviderSchema = providerSchema
  .fork(
    ["providerName", "restaurantName", "document", "bankNumber"],
    (field) => field.optional()
  )
  .fork(["isVerified", "Cloudinary_Id"], (field) => field.forbidden())
  .or("document", "bankNumber")
  .messages({
    "object.missing":
      "Document or Bank Number is required to update",
  });
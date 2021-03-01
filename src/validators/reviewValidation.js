const Joi= require("joi");

const validation = review => {
  const schema = Joi.object({
    user_id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "userId is required.",
        "string.empty": "userId cannot be an empty field.",
        "string.base": "userId must be a string.",
        "string.guid": "userId must be a UUID"
      }),
    landlordReview: Joi.string().required()
      .empty()
      .messages({
        "any.required": "about the landlord is required.",
        "string.empty": "landlord review cannot be an empty field.",
      }),
    appartmentReview: Joi.string().required()
      .empty()
      .messages({
        "any.required": "Appartment review is required.",
        "string.empty": "Appartment review cannot be an empty field.",
        "string.base": "Appartment review must be a string."
      }),
      ammenitiesQuality: Joi.string().required()
      .empty()
      .messages({
        "any.required": "Ammenities quality is required.",
        "string.empty": "Ammenities quality cannot be an empty field.",
        "string.base": "Ammenities quality must be a string."
      }),
   
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(review);
};

const validateId = ids => {
  const schema = Joi.object({
    id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
    user_id: Joi.string().guid({ version: "uuidv4" })
      .messages({
        "string.guid": "CountryId must be a UUID"
      })
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(ids);
};


module.exports = { validation, validateId };

import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": `"name" cannot be empty`,
    "string.min": `"name" should have at least {#limit} characters`,
    "string.max": `"name" should have at most {#limit} characters`,
    "any.required": `"name" is required`,
  }),

  category: Joi.string()
    .valid("Electronics", "Clothing", "Books", "Home", "Toys")
    .required()
    .messages({
      "any.only": `"category" must be one of Electronics, Clothing, Books, Home, Toys`,
      "any.required": `"category" is required`,
    }),

  price: Joi.number().min(0).precision(2).required().messages({
    "number.base": `"price" must be a number`,
    "number.min": `"price" cannot be negative`,
    "any.required": `"price" is required`,
  }),

  stock_status: Joi.string()
    .valid("in_stock", "out_of_stock")
    .default("in_stock")
    .messages({
      "any.only": `"stock_status" must be either 'in_stock' or 'out_of_stock'`,
      "any.required": `"stock_status" is required`,
    }),

  sku: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.alphanum": `"sku" must be alphanumeric`,
    "string.empty": `"sku" cannot be empty`,
    "string.min": `"sku" should have at least {#limit} characters`,
    "string.max": `"sku" should have at most {#limit} characters`,
    "any.required": `"sku" is required`,
  }),

  description: Joi.string().max(50).messages({
    "string.max": `"description" should have at most {#limit} characters`,
  }),
});

export default productSchema;
export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

// NOTE: Implement strong schemas

import Joi from "joi";

export const testSchema = Joi.object({
  username: Joi.string().required(),
});

export const blogDataSchema = Joi.object({
  author: Joi.string().required(),
  blogRef: Joi.string().required(),
  content: Joi.string().required(),
  imgUrl: Joi.string().required(),
  school: Joi.string().required(),
  teaser: Joi.string().required(),
  timeToRead: Joi.string().required(),
  title: Joi.string().required(),
});

export const deleteBlogSchema = Joi.object({
  blogContentId: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

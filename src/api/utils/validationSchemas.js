// NOTE: Implement strong schemas

import Joi from "joi";

export const testSchema = Joi.object({
  username: Joi.string().required(),
});

const allowedTags = [
  "Lifestyle",
  "Technology",
  "Health",
  "Business",
  "Food",
  "Education",
  "Entertainment",
  "Creativity",
  "Environment",
  "Relationships",
  "News",
  "Travel",
  "Interests",
  "Other",
];
export const blogDataSchema = Joi.object({
  authorId: Joi.string().length(20).required(),
  content: Joi.string().required(),
  imgUrl: Joi.string(),
  teaser: Joi.string().max(125).required(),
  timeToRead: Joi.string().required(),
  displayDate: Joi.number().required(),
  title: Joi.string().max(70).required(),
  tag: Joi.string()
    .valid(...allowedTags)
    .required(),
});

export const deleteBlogSchema = Joi.object({
  blogContentId: Joi.string().length(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const registerUserSchema = Joi.object({
  name: Joi.string().max(50).min(2).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  campus: Joi.string().required(),
  cms: Joi.string().required(),
});

export const updateAboutSchema = Joi.object({
  about: Joi.string().max(160).required(),
});

export const commentSchema = Joi.object({
  authorId: Joi.string().required(),
  displayDate: Joi.number().required(),
  comment: Joi.string().max(160).required(),
});

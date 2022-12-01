const Joi = require('joi');

module.exports.artSchema = Joi.object({
	art: Joi.object({
		title: Joi.string().required(),
		// images: Joi.string().required(),
		subject: Joi.string().required(),
		description: Joi.string()
	}).required(),
	deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		rating: Joi.number().required().min(1).max(5),
		body: Joi.string().required()

	}).required()
})
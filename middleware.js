const { session } = require('passport');
const Art = require('./models/art');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');
const { artSchema, reviewSchema } = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.save(function (err) {
			if (err) {
				return next(err);
			}
		})

		req.originalUrl = req.session.returnTo;
		console.log('***************')
		console.log('this is the original url', req.originalUrl)
		console.log('this is the original session id', req.session.id)
		redirectUrl = req.session.returnTo;
		console.log('***************')
		req.flash('error', 'you must be signed in');
		return res.redirect('/login')
	}
	next();
}

module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	// console.log('id is: ', id);
	// console.log('req.user is: ', req.user);
	// console.log('currentUser is: ', currentUser);
	const art = await Art.findById(id);
	console.log('art.author: ', art.author);
	if (!art.author.equals(req.user._id)) {
		req.flash('error', 'you do not have permisison to do that');
		return res.redirect(`/gallery/${id}`);
	}
	next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'you do not have permisison to do that');
		return res.redirect(`/gallery/${id}`);
	}
	next();
}

module.exports.validateArt = (req, res, next) => {
	const { error } = artSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}
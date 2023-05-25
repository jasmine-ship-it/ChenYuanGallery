const Art = require("../models/art");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const art = await Art.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  art.reviews.push(review);
  await review.save();
  await art.save();
  req.flash("success", "created new review");
  res.redirect(`/gallery/${art._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  Art.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Successfully deleted review!");
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/gallery/${id}`);
};

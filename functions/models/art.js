const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  this.url.replace("/upload", "/upload/w_300");
});

const artSchema = new Schema({
  title: {
    type: String,
    // required: true
  },
  images: [ImageSchema],
  subject: {
    type: String,
    // enum: ['Architecture', 'Landscape', 'People', 'Animal', 'Travel']
  },
  description: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // location: {
  // 	type: String,
  // },
  geometry: {},
});

artSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
const Art = mongoose.model("Art", artSchema);
module.exports = Art;

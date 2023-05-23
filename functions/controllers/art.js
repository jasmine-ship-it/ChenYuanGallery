const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Art = require("../models/art");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const arts = await Art.find({});
  res.render("gallery", { arts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new");
};

module.exports.createArt = async (req, res, next) => {
  // const geoData = await geocoder.forwardGeocode({
  // 	query: req.body.art.location,
  // 	limit: 1
  // }).send()
  // res.send(geoData.body.features[0].geometry.coordinates)
  const art = await Art(req.body.art);
  art.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  art.author = req.user._id;
  await art.save();
  console.log(art);
  req.flash("success", "Successfully uploaded new artwork!");
  res.redirect(`/gallery/${art._id}`);
};

module.exports.showArt = async (req, res) => {
  const art = await Art.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!art) {
    req.flash("error", "Cannot find that artwork!");
    return res.redirect("/gallery");
  }
  res.render("show", { art });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const art = await Art.findById(id);
  if (!art) {
    req.flash("error", "Artwork doesn't exist!");
    return res.redirect("/gallery");
  }
  res.render("edit", { art });
};

module.exports.updateArt = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const art = await Art.findByIdAndUpdate(id, { ...req.body.art });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  art.images.push(...imgs);
  await art.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await art.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(art);
  }
  req.flash("success", "successfully updated artwork!");
  res.redirect(`/gallery/${art._id}`);
};

module.exports.deleteArt = async (req, res) => {
  const { id } = req.params;
  await Art.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted artwork!");
  res.redirect(`/gallery`);
};

const express = require('express');
const router = express.Router({ mergeParams: true });
const arts = require('../controllers/art')
const catchAsync = require('../utils/catchAsync');
const { artSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateArt } = require('../middleware');
const Art = require('../models/art');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
	// GALLERY INDEX
	.get(catchAsync(arts.index))
	// CREATE A NEW ART
	.post(isLoggedIn, upload.array('image'), validateArt, catchAsync(arts.createArt))
// .post(upload.array('image'), (req, res) => {
// 	console.log(req.body, req.files);
// 	res.send('it worked')
// })

//NEW
router.get('/new', isLoggedIn, arts.renderNewForm);

router.route('/:id')
	// SHOW //
	.get(catchAsync(arts.showArt))

	// UPDATE
	.put(isLoggedIn, isAuthor, upload.array('image'), validateArt, catchAsync(arts.updateArt))

	// DELETE
	.delete(isLoggedIn, isAuthor, catchAsync(arts.deleteArt))

// EDIT //
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(arts.renderEditForm));

module.exports = router;
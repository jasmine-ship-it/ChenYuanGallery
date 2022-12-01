if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const { isLoggedIn } = require('./middleware');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const ExpressError = require('./utils/ExpressError');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const mongoose = require('mongoose');
const Art = require('./models/art');
const User = require('./models/user');
const Review = require('./models/review');

const userRoutes = require('./routes/users');
const artRoutes = require('./routes/arts');
const reviewRoutes = require('./routes/reviews');

//------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/art-gallery');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});
//------------------------------------------------------------------
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
	secret: 'thisshouldbebettersecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	// console.log(req.session)
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
})

app.use('/', userRoutes);
app.use('/gallery', artRoutes);
app.use('/gallery/:id/reviews', reviewRoutes);

app.get('/about', (req, res) => {
	res.render('about')
})

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "something went wrong!"
	res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
	console.log('serving on port 3000');
})
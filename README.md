# Chen Yuan Art Gallery
## Overview
The Online Art Gallery app enables users to upload and showcase their artwork. Users can sign up, create an account, and comment on the art pieces. This project uses Express for the server, Bootstrap for styling, and MongoDB for the database.

## Features
- User Authentication: Sign up, log in, and manage user accounts.
- Upload Artwork: Users can upload images of their artwork.
- Comment on Art: Registered users can comment on artwork.
- Responsive Design: The app is styled with Bootstrap for a responsive and modern interface.
  
## Technologies Used
  - Express: Web framework for Node.js.
  - Bootstrap: Front-end framework for responsive design.
  - MongoDB: Database for storing user and art data.

## Installation
1. Clone the Repository:
```
git clone https://github.com/yourusername/online-art-gallery.git
cd online-art-gallery
```
2. Install Dependencies:
```
npm install
```
3. Set Up Environment Variables:
Create a .env file in the root directory and add your configuration:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
DATABASE_URL=mongodb://localhost:27017/art-gallery
SESSION_SECRET=your_session_secret
```
4. Run the App:
```
npm start
Project Structure
java
Copy code
online-art-gallery/
├── src/
│   ├── models/
│   │   ├── artwork.js
│   │   ├── comment.js
│   │   └── user.js
│   ├── routes/
│   │   ├── artworks.js
│   │   ├── comments.js
│   │   └── index.js
│   ├── views/
│   │   ├── artworks/
│   │   ├── comments/
│   │   ├── layouts/
│   │   └── partials/
│   ├── app.js
│   └── middleware.js
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── .env
├── package.json
└── README.md
```
## Usage
1. Sign Up and Log In:
Users can sign up for an account and log in to access all features.

2. Upload Artwork:
Navigate to the upload page, fill in the details, and upload an image of your artwork.

3. Comment on Art:
View any artwork and leave comments if you are logged in.

## Contact
For any questions or feedback, please open an issue or reach out to me at jasminehui293@gmail.com

Thank you for using the Online Art Gallery! We hope you enjoy showcasing and discovering amazing artwork.

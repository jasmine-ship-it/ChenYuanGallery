const mongoose = require("mongoose");
const Art = require("../models/art");
const { places, descriptors, subj } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/art-gallery");

const db = mongoose.connection;
klkl;
jko;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Art.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const art = new Art({
      author: "637fbc7ee47a9539b0f6a31b",
      title: `${sample(descriptors)}${sample(places)}`,
      subject: `${sample(subj)}`,
      description: `${sample(descriptors)}`,
      src: `picture${i + 1}.jpeg`,
    });
    await art.save();
  }
};

seedDB();

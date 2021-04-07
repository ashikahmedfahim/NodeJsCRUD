const mongoose = require("mongoose");
const campground = require("../models/campground");
const Campground = require("../models/campground");
const cities = require("../seeds/cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelpcamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: `6062e3fbaeefa308d03e0f8d`,
      location: `${cities[rand1000].city},${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [{
        url: 'https://res.cloudinary.com/ashikahmed96/image/upload/v1617195639/Yelpcamp/hch3hgx4lpsohmo5vsq7.png',
        filename: 'Yelpcamp/hch3hgx4lpsohmo5vsq7'
      }],
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta adipisci cum ratione.
            Aspernatur dolorum corrupti enim deserunt odit! Perferendis ipsa quaerat labore itaque fugit quo,
            vel numquam tempore quam mollitia.`,
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  console.log("closing");
  mongoose.connection.close();
});

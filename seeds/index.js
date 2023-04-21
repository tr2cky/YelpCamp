const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database Connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6435832a22f89c2d13b3f640',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa laboriosam quam ex? Voluptatibus animi, doloribus ut molestiae corrupti veritatis cumque eius consequuntur. Quam dolorem ratione illo praesentium doloribus sapiente cupiditate?',
            price,
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dh8gjjrmj/image/upload/v1681886331/YelpCamp/f7edd4jdnwiiokj7wxqk.jpg',
                    filename: 'YelpCamp/f7edd4jdnwiiokj7wxqk',
                },
                {
                    url: 'https://res.cloudinary.com/dh8gjjrmj/image/upload/v1681886331/YelpCamp/zus1z3ibygd7uhjmmetc.jpg',
                    filename: 'YelpCamp/zus1z3ibygd7uhjmmetc',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json').results
const User = require('../user')
const db = require('../../config/mongoose')

const userSeeds = [
  {
    name: '哥吉拉',
    email: 'user1@example.com',
    password: '12345678',
    ownedrestaurants: restaurantSeeds.slice(0, 3)
  },
  {
    name: '王者基多拉',
    email: 'user2@example.com',
    password: '12345678',
    ownedrestaurants: restaurantSeeds.slice(3, 7)
  }
]
 db.once('open', () => {
   return Promise.all(userSeeds.map(async user =>{
    const ownedrestaurants = user.ownedrestaurants
    await User.create({
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    })
      .then(user => {
        return Promise.all(ownedrestaurants.map(async ownedrestaurant=>{
          await Restaurant.create({
            name: ownedrestaurant.name,
            name_en: ownedrestaurant.name_en,
            category: ownedrestaurant.category,
            image: ownedrestaurant.image,
            location: ownedrestaurant.location,
            phone: ownedrestaurant.phone,
            google_map: ownedrestaurant.google_map,
            rating: ownedrestaurant.rating,
            description: ownedrestaurant.description,
            userId: user._id
          })
        }))
      })
      .then(() =>{
        console.log('done.')
        process.exit()
      })

    }))
})
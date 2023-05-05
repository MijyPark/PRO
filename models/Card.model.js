const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const cardSchema = new Schema(
  { 
    cardname: {
    type: String
      },

    category: {
     type: String,   
     enum: ['Angel', 'Demon', 'Between'],
     default: 'Demon',
    },
     price: {
        type: Number,
        default: 100,
      },
    quality: {
        type: String,
        enum: ['Mint', 'Good', 'LP'],
        default: 'Good',
     },
    tradingOption: {
      type: String,
      enum: ['Gold', 'Cash'],
      default: 'Gold',
     },

    description: {
      type: [String],
      required: true,
    },
    
    image: String,
    
  }, 
  {
    timestamps: true
  }
)


const Card = model('Card', cardSchema)

module.exports = Card
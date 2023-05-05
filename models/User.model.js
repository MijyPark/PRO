const { Schema, model } = require('mongoose')
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    
    password: {
      type: String,
      required: true, 
    },
    
    memberlevel: {
    type: String,   
    enum: ['Bronz', 'Silver', 'Gold'],
    default: 'Gold'
    },
  
    contact: {
    type: Number,
    default: 123
    },
  
    email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
   }
  
 },
  
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User

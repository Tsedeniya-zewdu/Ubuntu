import 'dotenv/config'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: false,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  }
})

// create jwt token generating method for user model
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY)
  return token
}

export const AdminModel = mongoose.model('Admin', adminSchema)

export const validateAdminSignup = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().min(4).max(50).required(),
    type: Joi.string().min(4).max(50).required(),
  })
  return schema.validate(user)
}
export const validateAdminLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
    type: Joi.string().min(4).max(50).required(),
  })
  return schema.validate(user)
}

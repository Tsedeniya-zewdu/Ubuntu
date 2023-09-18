import 'dotenv/config'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
  })
  
  export const TokenModel = mongoose.model('Token', tokenSchema)
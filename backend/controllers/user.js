import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { UserModel } from '../models/User.js'
import { FundraiserModel } from './../models/fundraiser.js'
import { AdminModel } from '../models/admin.js'

export const getUser = async (req, res) => {
  if (req.body.role == 'User') {
    const user = await UserModel.findById(req.body.user).select('-password')
    res.send(user)
  } else if (req.body.role == 'Fundraiser') {
    const user = await FundraiserModel.findById(req.body.user).select(
      '-password',
    )
    res.send(user)
  } else if (req.body.role == 'Admin') {
    const user = await AdminModel.findById(req.body.user).select('-password')
    res.send(user)
  }
}

export const getUsers = async (req, res) => {
  const users = await UserModel.find({ role: 'User' }).select('-password')
  res.send(users)
}

// For uploading image to server
let uploadedPicture
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    let fileName =
      file.fieldname + '-' + uuidv4() + path.extname(file.originalname)
    uploadedPicture = fileName
    console.log('From UPload: ', fileName)
    cb(null, fileName)
  },
})

export const upload = multer({ storage: storage })

// Create new profile
export const addProfile = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
    return res.status(404).json({ error: 'No such User' })
  }

  // add doc to db
  try {
    if (req.body.role == 'User') {
      const user = await UserModel.updateOne(
        { _id: req.body.user },
        {
          $set: { image: uploadedPicture },
        },
      )
      // Reset variables
      uploadedPicture = ''

      res.status(200).json(user)
    } else if (req.body.role == 'Fundraiser') {
      const user = await FundraiserModel.updateOne(
        { _id: req.body.user },
        {
          $set: { image: uploadedPicture },
        },
      )
      // Reset variables
      uploadedPicture = ''

      res.status(200).json(user)
    } else if (req.body.role == 'Admin') {
      const user = await AdminModel.updateOne(
        { _id: req.body.user },
        {
          $set: { image: uploadedPicture },
        },
      )
      // Reset variables
      uploadedPicture = ''

      res.status(200).json(user)
    }
  } catch (err) {
    // Reset variables
    uploadedPicture = ''
    res.status(400).json({ error: err.message })
  }
}

export const deleteProfile = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
    return res.status(404).json({ error: 'No such User' })
  }

  if (req.body.role == 'User') {
    const user = await UserModel.updateOne(
      { _id: req.body.user },
      {
        $set: { image: '' },
      },
    )
    if (
      fs.existsSync(`./uploads/${user.image}`) &&
      `./uploads/${user.image}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${user.image}`)
    }

    if (!user) {
      return res.status(404).json({ error: 'No such User' })
    }

    res.status(200).json(user)
  } else if (req.body.role == 'Fundraiser') {
    const user = await FundraiserModel.updateOne(
      { _id: req.body.user },
      {
        $set: { image: '' },
      },
    )
    if (
      fs.existsSync(`./uploads/${user.image}`) &&
      `./uploads/${user.image}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${user.image}`)
    }

    if (!user) {
      return res.status(404).json({ error: 'No such User' })
    }

    res.status(200).json(user)
  } else if (req.body.role == 'Admin') {
    const user = await AdminModel.updateOne(
      { _id: req.body.user },
      {
        $set: { image: '' },
      },
    )
    if (
      fs.existsSync(`./uploads/${user.image}`) &&
      `./uploads/${user.image}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${user.image}`)
    }

    if (!user) {
      return res.status(404).json({ error: 'No such User' })
    }

    res.status(200).json(user)
  }
}


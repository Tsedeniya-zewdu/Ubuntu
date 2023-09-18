import { getUser, getUsers } from '../controllers/user.js'
import express from 'express'
import { addProfile, upload, deleteProfile } from '../controllers/user.js'

const router = express.Router()

// get all users
router.get('/', getUsers)

// get a single user
router.post('/user', getUser)

// Create add new profile picture
router.post('/profile', upload.single('profile'), addProfile)

// Delete a profile picture
router.patch('/profile/delete', deleteProfile)

export default router

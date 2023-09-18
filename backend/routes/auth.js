import express from 'express'
import {
  register,
  login,
  logout,
  emailValidation,
  forgetPassword,
  passwordReset,
  newPassword,
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/email-validation/:userId/:token', emailValidation)
router.post('/forget-password', forgetPassword)
router.get('/password-reset/:userId/:token', passwordReset)
router.post('/update-password', newPassword)

export default router

import express from 'express'
import {
  getAdminNotificationHistory1,
  getAdminNotification1,
  getAdminNotificationHistory2,
  getAdminNotification2,
  getUserNotification,
  getUserNotificationHistory,
  getFundraiserNotification,
  getFundraiserNotificationHistory,
} from '../controllers/notification.js'

const router = express.Router()

// user notifications
router.post('/user', getUserNotification)
router.post('/user/history', getUserNotificationHistory)

// fundraiser notifications
router.post('/fundraiser', getFundraiserNotification)
router.post('/fundraiser/history', getFundraiserNotificationHistory)

// admin notifications
router.get('/admin1', getAdminNotification1)
router.get('/admin1/history', getAdminNotificationHistory1)
router.get('/admin2', getAdminNotification2)
router.get('/admin2/history', getAdminNotificationHistory2)

export default router

import express from 'express'
import { getAdminNotificationHistory, getAdminNotification, getUserNotification, getUserNotificationHistory, getFundraiserNotification, getFundraiserNotificationHistory } from '../controllers/notification.js'


const router = express.Router()

// user notifications
router.post('/user', getUserNotification)
router.post('/user/history', getUserNotificationHistory)

// fundraiser notifications
router.post('/fundraiser', getFundraiserNotification)
router.post('/fundraiser/history', getFundraiserNotificationHistory)

// admin notifications
router.get('/admin', getAdminNotification)
router.get('/admin/history', getAdminNotificationHistory)

export default router
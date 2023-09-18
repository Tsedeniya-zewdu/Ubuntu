import express from 'express'
import {
  createDonation,
  getDonations,
  getFundraiserDonations,
  getProjectDonations,
  getUserDonations,
  verifyDonation,
} from '../controllers/donation.js'

const router = express.Router()

// get all donation
 router.get('/', getDonations)

// get donations for project
router.get('/project/:id', getProjectDonations)

// get donations for user
router.get('/user/:id', getUserDonations)

// get donations for fundraiser
router.get('/fundraiser/:id', getFundraiserDonations)

// verify payment 
router.get('/verify/:txRef/:projectId/:fundraiserId/:userId', verifyDonation)

// create donations
router.post('/', createDonation)

export default router

import express from 'express'
import  {getFundraiser, getFundraiserProjects, getFundraisers}  from '../controllers/fundraiser.js'

const router = express.Router()

// get fundraisers
router.get('/', getFundraisers)

// get fundraiser
router.get('/:id', getFundraiser)
// get all projects
router.post('/projects', getFundraiserProjects)


export default router
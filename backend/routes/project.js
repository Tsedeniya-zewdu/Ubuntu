import express from 'express'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  upload,
  uploadUpdate,
  deleteUpdate,
  getPendingProjects,
  approvePendingProject,
  rejectPendingProject,
  updateProjectFromApp,
  getProjectsByCategory,
  searchProjects,
  getCompletedProjects,
  getAllProjects,
} from '../controllers/project.js'

const router = express.Router()

// get all projects
router.get('/', getProjects)

// get completed projects 
router.get('/completed', getCompletedProjects)

// get completed projects 
router.get('/all', getAllProjects)

// get projects by category
router.get('/category/:id', getProjectsByCategory)

// search projects by fundraiser or title
router.post('/search', searchProjects)

// get all pending projects
router.get('/pending', getPendingProjects)

// approve a project
router.get('/approve/:id', approvePendingProject)

// reject a project
router.get('/reject/:id', rejectPendingProject)

// get a single project
router.get('/project/:id', getProject)

// // get fundraiser's projects
// router.get('/fundraiser', getFundraiserProjects)

// Create new project
router.post(
  '/',
  upload.fields([
    {
      name: 'img',
      maxCount: 10,
    },
    {
      name: 'vid',
      maxCount: 1,
    },
    {
      name: 'doc',
      maxCount: 10,
    },
  ]),
  createProject,
)

// Delete a project
router.delete('/:id', deleteProject)

// Update project from system
router.patch('/update', updateProjectFromApp)

// Update a project
router.patch('/:id', updateProject)

// Create new project
router.post(
  '/upload',
  upload.fields([
    {
      name: 'img',
      maxCount: 10,
    },
    {
      name: 'vid',
      maxCount: 1,
    },
    {
      name: 'doc',
      maxCount: 10,
    },
  ]),
  uploadUpdate,
)

// Create new project
router.post(
  '/delete',
  deleteUpdate,
)

export default router

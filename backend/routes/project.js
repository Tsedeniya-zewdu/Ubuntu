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
  getPendingProjects1,
  getPendingProjects2,
  approvePendingProject1,
  approvePendingProject2,
  rejectPendingProject1,
  rejectPendingProject2,
  updateProjectFromApp,
  getProjectsByCategory,
  searchProjects,
  getCompletedProjects,
  getAllProjects,
  updateNews,
  getCompletedProjectGraphData,
  showNews,
  hideNews,
  getNewsProjects,
  getExpiredProjects,
  getRejectedProjects,
  getPendingNews,
} from '../controllers/project.js'

const router = express.Router()

// get all projects
router.get('/', getProjects)

// get completed projects 
router.get('/completed', getCompletedProjects)

// get Expired projects 
router.get('/expired', getExpiredProjects)

// get rejected projects 
router.get('/rejected', getRejectedProjects)

// get project news 
router.get('/news', getNewsProjects)
// get project news 
router.get('/news-pending', getPendingNews)

// get completed projects 
router.get('/all', getAllProjects)

// get completed project donation graph data 
router.get('/completed/:id', getCompletedProjectGraphData)

// make news shown
router.get('/show/:id', showNews)

// make news hidden
router.get('/hide/:id', hideNews)

// get projects by category
router.get('/category/:id', getProjectsByCategory)

// search projects by fundraiser or title
router.post('/search', searchProjects)

// get all pending projects
router.get('/pending1', getPendingProjects1)
router.get('/pending2', getPendingProjects2)

// approve a project
router.get('/approve1/:id', approvePendingProject1)
router.get('/approve2/:id', approvePendingProject2)

// reject a project
router.get('/reject1/:id', rejectPendingProject1)
router.get('/reject2/:id', rejectPendingProject2)

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

// Update a news
router.put('/news/:id', updateNews)

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

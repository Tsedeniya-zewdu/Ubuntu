import { ProjectModel } from '../models/project.js'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { sendEmail } from '../utils/sendEmail.js'
import { UserModel } from '../models/User.js'
import { DonationModel } from '../models/donation.js'

export const getProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Approved',
        projectApproval2: 'Approved',
        status: 'Open',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get completed projects
export const getCompletedProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Approved',
        projectApproval2: 'Approved',
        status: 'Completed',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get expired projects
export const getExpiredProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        status: 'Expired',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get rejected projects
export const getRejectedProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Rejected',
        projectApproval2: 'Rejected',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get completed projects
export const getNewsProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Approved',
        projectApproval2: 'Approved',
        status: 'Completed',
        news: 'Visible',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get completed projects
export const getPendingNews = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        status: 'Completed',
        news: 'Hidden',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get completed projects donations graph data
export const getCompletedProjectGraphData = async (req, res) => {
  const { id } = req.params
  // let pid = mongoose.Types.ObjectId(id);
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  // get donations per project
  let joinedData = await DonationModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'fundraiser',
      },
    },
    {
      $lookup: {
        from: 'projects',
        localField: 'project',
        foreignField: '_id',
        as: 'project',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $match: {
        projectId: id,
      },
    },
    { $sort: { createdAt: 1 } },
  ])

  let donationData
  let donationsData = []
  let donationCounter = 0

  let initialDateObj = new Date(joinedData[0].createdAt)
  donationData = {
    year: initialDateObj.getUTCFullYear(),
    yAmount: 0,
    months: [
      {
        month: initialDateObj.getUTCMonth(),
        mAmount: 0,
        days: [
          {
            day: initialDateObj.getUTCDay(),
            dAmount: 0,
          },
        ],
      },
    ],
  }
  donationsData.push(donationData)

  joinedData.forEach((donation) => {
    let currentDateObj = new Date(donation.createdAt)
    let currentYear = currentDateObj.getUTCFullYear()
    let currentMonth = currentDateObj.getUTCMonth() + 1
    let currentDay = currentDateObj.getUTCDay() + 1
    let currentYearAmount = donation.amount
    let currentMonthAmount = donation.amount
    let currentDayAmount = donation.amount
    // if (!donationCounter) {
    //   let initialDateObj = new Date(donation.createdAt)
    //   donationData = {
    //     year: initialDateObj.getUTCFullYear(),
    //     yAmount: donation.amount,
    //     months: [
    //       {
    //         month: initialDateObj.getUTCMonth() + 1,
    //         mAmount: donation.amount,
    //         days: [
    //           {
    //             day: initialDateObj.getUTCDay() + 1,
    //             dAmount: donation.amount
    //           }
    //         ]
    //       }
    //     ]
    //   }
    //   console.log("First Year")
    //   donationsData.push(donationData)
    // } else if (donationsData.length > 0) {
    if (currentYear == donationsData[donationsData.length - 1].year) {
      console.log('Same Year')
      // yes -> add amount on year amount ,
      donationsData[donationsData.length - 1].yAmount += currentYearAmount
      // then check current month match with previous
      donationsData[donationsData.length - 1].months.forEach((monthData) => {
        if (currentMonth == monthData.month) {
          monthData.mAmount = currentMonthAmount
          // then check current day match with previous
          monthData.days.forEach((dayData) => {
            if (currentDay == dayData.day) {
              dayData.dAmount = currentDayAmount
            } else {
              // add new day data
              let newDay = {
                day: currentDay,
                dAmount: currentDayAmount,
              }
              monthData.days.push(newDay)
            }
          })
        } else {
          // add new month data
          let newMonth = {
            month: currentMonth,
            mAmount: currentMonthAmount,
            days: [
              {
                day: currentDay,
                dAmount: currentDayAmount,
              },
            ],
          }
          donationsData[donationsData.length - 1].months.push(newMonth)
        }
      })
    } else {
      console.log('New Year')
      donationData = {
        year: currentYear,
        yAmount: currentYearAmount,
        months: [
          {
            month: currentMonth,
            mAmount: currentMonthAmount,
            days: [
              {
                day: currentDay,
                dAmount: currentDayAmount,
              },
            ],
          },
        ],
      }
      donationsData.push(donationData)
    }
    // }
    // donationCounter++
    // console.log(donationCounter)
  })
  // donationsData[donationsData.length - 1].months.pop()
  donationsData.forEach((data) => {
    data.months.pop()
  })

  res.status(200).send(donationsData)
}

// all approved projects
export const getAllProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Approved',
        projectApproval2: 'Approved',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const showNews = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let news = 'Visible'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      news: news,
    },
  )
  // console.log(project)

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

export const hideNews = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let news = 'Hidden'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      news: news,
    },
  )
  console.log(project)
  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

// get project by category
export const getProjectsByCategory = async (req, res) => {
  const { id } = req.params
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Approved',
        projectApproval2: 'Approved',
        status: 'Open',
        category: id,
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const searchProjects = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        approval: 'Approved',
        status: 'Open',
        'details[0].name': req.body.id,
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getPendingProjects1 = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval1: 'Pending',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getPendingProjects2 = async (req, res) => {
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        projectApproval2: 'Pending',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getProject = async (req, res) => {
  const { id } = req.params
  // let pid = mongoose.Types.ObjectId(id);
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let pid = new mongoose.Types.ObjectId(id)
  let joinedData = await ProjectModel.aggregate([
    {
      $lookup: {
        from: 'fundraisers',
        localField: 'fundraiser',
        foreignField: '_id',
        as: 'details',
      },
    },
    {
      $match: {
        _id: pid,
      },
    },
    { $sort: { updatedAt: -1 } },
  ])

  if (!joinedData) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).send(joinedData)
  // res.status(200).send('Single Project ')
}

// For uploading images, video and documents to server
let uploadedFiles = []
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    let fileName =
      file.fieldname + '-' + uuidv4() + path.extname(file.originalname)
    uploadedFiles.push(fileName)
    cb(null, fileName)
  },
})

export const upload = multer({ storage: storage })

// Create new project
export const createProject = async (req, res) => {
  // destructuring incoming data
  const {
    title,
    desc,
    story,
    amount,
    deadline,
    raised,
    category,
    fundraiser,
  } = req.body

  let images = []
  let video = ''
  let docs = []
  let status = 'Pending'
  let request = 'Create'
  let projectApproval1 = 'Pending'
  let projectApproval2 = 'waiting'
  let fundraiserRequestedAt = Date.now()
  // let newsApproval1 = ''
  // let newsApproval2 = ''
  // let projectApprovedAt = ''
  // let projectRejectedAt = ''
  // let newsApprovedAt = ''
  // let projectApprovedBy1 = ''
  // let projectApprovedBy2 = ''
  // let newsApprovedBy1 = ''
  // let newsApprovedBy2 = ''
  // let

  uploadedFiles.map((data) => {
    if (data.slice(0, 3) == 'img') {
      images.push(data)
    } else if (data.slice(0, 3) == 'vid') {
      video = data
    } else if (data.slice(0, 3) == 'doc') {
      docs.push(data)
    }
  })

  // add doc to db
  try {
    const project = await ProjectModel.create({
      title,
      desc,
      story,
      amount,
      deadline,
      raised,
      images,
      video,
      docs,
      category,
      fundraiser,
      status,
      projectApproval1,
      request,
      projectApproval2,
      fundraiserRequestedAt,
    })
    console.log('project ADDED')
    // Reset variables
    uploadedFiles = []
    images = []
    video = ''
    docs = []
    res.status(200).json(project)
  } catch (err) {
    // Reset variables
    uploadedFiles = []
    images = []
    video = ''
    docs = []
    res.status(400).json({ error: err.message })
  }
}

export const deleteProject = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  const project = await ProjectModel.findByIdAndRemove({ _id: id }) // only from database

  if (
    fs.existsSync(`./uploads/${project.video}`) &&
    `./uploads/${project.video}` != './uploads/'
  ) {
    fs.unlinkSync(`./uploads/${project.video}`)
  }
  project.images.map((img) => {
    if (
      fs.existsSync(`./uploads/${img}`) &&
      `./uploads/${img}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${img}`)
    }
  })
  project.docs.map((doc) => {
    if (
      fs.existsSync(`./uploads/${doc}`) &&
      `./uploads/${doc}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${doc}`)
    }
  })

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

export const updateProject = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let status = 'Pending'
  let request = 'Update'
  let projectApproval1 = 'Pending'
  let projectApproval2 = 'waiting'
  let fundraiserRequestedAt = Date.now()
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      status: status,
      request: request,
      projectApproval1: projectApproval1,
      projectApproval2: projectApproval2,
      fundraiserRequestedAt: fundraiserRequestedAt,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

export const updateNews = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let news = 'Visible'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      news: news,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

// update from system
export const updateProjectFromApp = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    return res.status(404).json({ error: 'No such project id' })
  }
  let project
  if (req.body.status == 'Completed') {
    project = await ProjectModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        ...req.body,
        projectCompletedAt: Date.now(),
        news: 'Hidden',
      },
    )
  } else {
    project = await ProjectModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        ...req.body,
      },
    )
  }

  if (!project) {
    return res.status(404).json({ error: 'No such project data' })
  }

  res.status(200).json(project)
}

// close project request
export const closeProject = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  let approval = 'Pending'
  let status = 'Pending'
  let request = 'Close'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      approval: approval,
      status: status,
      request: request,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

// approve pending project
export const approvePendingProject1 = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  let projectApproval1 = 'Approved'
  // let status = 'Open'
  let adminRequestedAt = Date.now()
  let adminRequestType = 'Approve'
  let projectApproval2 = 'Pending'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      projectApproval1: projectApproval1,
      // status: status,
      adminRequestedAt: adminRequestedAt,
      adminRequestType: adminRequestType,
      projectApproval2: projectApproval2,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

export const approvePendingProject2 = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  let projectApproval2 = 'Approved'
  let status = 'Open'
  let projectApprovedAt = Date.now()
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      projectApproval2: projectApproval2,
      status: status,
      projectApprovedAt: projectApprovedAt,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  let users = await UserModel.find({})

  for (let i = 0; i < users.length; i++) {
    const sendAll = async () => {
      const link = `
      <!DOCTYPE html>
  <html>
  <head>
  
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%; /* 1 */
      -webkit-text-size-adjust: 100%; /* 2 */
    }
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    table {
      border-collapse: collapse !important;
    }
    a {
      color: #1a82e2;
    }
    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
    </style>
  
  </head>
  <body style="background-color: #e9ecef;">
  
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
  
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="padding: 36px 24px;">
                <a href="http://localhost:3000/" target="_blank" style="display: inline-block;">
                  <img src="https://res.cloudinary.com/dhh506siq/image/upload/v1694874886/logo_ochye0.png" alt="Logo" border="0" width="48" style="display: block; width: 140px; max-width: 140px; min-width: 48px;">
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">New project released</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  
          <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            <p style="margin: 0;">To view project details, please click the button below.</p>
          </td>
        </tr>
  
            <!-- start button -->
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" bgcolor="#029a5b" style="border-radius: 6px;">
                            <a href="http://localhost:3000/projects/${project._id}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">View Project</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0;"></p>
               
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                <p style="margin: 0;">Copyright © Ubuntu 2023.</p>
              </td>
            </tr>
  
          </table>
        </td>
      </tr>
  
      <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  
  
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  
    </table>
  
  </body>
  </html>
      `
      // const link = `http://localhost:3000/projects/${project._id}`
      await sendEmail(users[i].email, 'New fundrasing project released', link)
    }
    sendAll()
  }

  res.status(200).json(project)
}

// reject pending project
export const rejectPendingProject1 = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  let projectApproval1 = 'Rejected'
  // let status = 'Closed'
  let adminRequestType = 'Reject'
  let adminRequestedAt = Date.now()
  let projectApproval2 = 'Pending'
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      projectApproval1: projectApproval1,
      // status: status,
      adminRequestType: adminRequestType,
      adminRequestedAt: adminRequestedAt,
      projectApproval2: projectApproval2,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

export const rejectPendingProject2 = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }
  let projectApproval2 = 'Rejected'
  let status = 'Closed'
  let projectRejectedAt = Date.now()
  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    {
      projectApproval2: projectApproval2,
      status: status,
      projectRejectedAt: projectRejectedAt,
    },
  )

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

// Create new project
export const uploadUpdate = async (req, res) => {
  let images = []
  let video = ''
  let docs = []

  uploadedFiles.map((data) => {
    if (data.slice(0, 3) == 'img') {
      images.push(data)
    } else if (data.slice(0, 3) == 'vid') {
      video = data
    } else if (data.slice(0, 3) == 'doc') {
      docs.push(data)
    }
  })

  // send to client
  try {
    const project = {
      images,
      video,
      docs,
    }
    // Reset variables
    uploadedFiles = []
    images = []
    video = ''
    docs = []
    res.status(200).json(project)
  } catch (err) {
    // Reset variables
    uploadedFiles = []
    images = []
    video = ''
    docs = []
    res.status(400).json({ error: err.message })
  }
}

export const deleteUpdate = async (req, res) => {
  const project = {
    images: req.body.images,
    docs: req.body.docs,
    video: req.body.video,
  }

  if (project.images) {
    project.images.map((data) => {
      if (
        fs.existsSync(`./uploads/${data}`) &&
        `./uploads/${data}` != './uploads/'
      ) {
        fs.unlinkSync(`./uploads/${data}`)
      }
    })
  }

  if (project.docs) {
    project.docs.map((data) => {
      if (
        fs.existsSync(`./uploads/${data}`) &&
        `./uploads/${data}` != './uploads/'
      ) {
        fs.unlinkSync(`./uploads/${data}`)
      }
    })
  }

  if (project.video) {
    if (
      fs.existsSync(`./uploads/${project.video}`) &&
      `./uploads/${project.video}` != './uploads/'
    ) {
      fs.unlinkSync(`./uploads/${project.video}`)
    }
  }

  if (!project) {
    return res.status(404).json({ error: 'No such Files' })
  }

  res.status(200).json(project)
}

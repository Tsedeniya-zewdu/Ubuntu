import { UserModel } from '../models/User.js'
import { ProjectModel } from '../models/project.js'
import { DonationModel } from './../models/donation.js'

export const getUserNotification = async (req, res) => {
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
        projectApproval2: 'Approved',
        status: 'Open',
        projectApprovedAt: { $gt: new Date(req.body.login) },
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getUserNotificationHistory = async (req, res) => {
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
        projectApproval2: 'Approved',
        status: 'Open',
        createdAt: { $gt: new Date('approved') },
        projectApprovedAt: { $lt: new Date(req.body.login) },
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getAdminNotification1 = async (req, res) => {
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

export const getAdminNotification2 = async (req, res) => {
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

export const getAdminNotificationHistory1 = async (req, res) => {
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
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getAdminNotificationHistory2 = async (req, res) => {
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
        projectApproval2: 'Approved',
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getFundraiserNotification = async (req, res) => {
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
        status: 'success',
        createdAt: { $gt: new Date(req.body.login) },
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getFundraiserNotificationHistory = async (req, res) => {
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
        status: 'success',
        fundraiserId: req.body._id,
        createdAt: { $lt: new Date(req.body.login) },
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

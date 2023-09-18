import { FundraiserModel } from '../models/fundraiser.js'
import { ProjectModel } from '../models/project.js'
import mongoose from 'mongoose'

export const getFundraiserProjects = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.fundraiser)) {
    return res.status(404).json({ error: 'No such Fundraiser' })
  }

  const project = await ProjectModel.find({ fundraiser: req.body.fundraiser }).sort({updatedAt: -1})

  if (!project) {
    return res.status(404).json({ error: 'No such Fundraiser project' })
  }

  res.status(200).json(project)
}

export const getProject = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project' })
  }

  const project = await ProjectModel.findById(id)

  if (!project) {
    return res.status(404).json({ error: 'No such project' })
  }

  res.status(200).json(project)
}

// get all fundraisers
export const getFundraisers = async (req, res) => {
  const fundraisers = await FundraiserModel.find({ role: 'Fundraiser' }).select(
    '-password',
  )
  res.send(fundraisers)
}

export const getFundraiser = async (req, res) => {
  const { id } = req.params 
  const fundraiser = await FundraiserModel.findById(id).select('-password')
  res.send(fundraiser)
}

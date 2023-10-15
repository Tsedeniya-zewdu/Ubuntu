import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    raised: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    video: {
        type: String
    },
    docs: {
        type: Array
    },
    category: {
        type: String
    },
    fundraiser: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Fundraiser'
    },
    status: {
        type: String,
    },
    projectApproval1: {
        type: String
    },
    projectApproval2: {
        type: String,
    },
    newsApproval1: {
        type: String,
    },
    newsApproval2: {
        type: String,
    },
    projectApprovedAt: {
        type: Date
    },
    projectRejectedAt: {
        type: Date
    },
    newsApprovedAt: {
        type: Date
    },
    projectApprovedBy1: {
        type: String,
    },
    projectApprovedBy2: {
        type: String,
    },
    newsApprovedBy1: {
        type: String,
    },
    newsApprovedBy2: {
        type: String,
    },
    request: {
        type: String
    },
    adminRequestType: {
        type: String,
    },
    fundraiserRequestedAt: {
        type: Date,
    },
    adminRequestedAt: {
        type: Date,
    },
    projectCompletedAt: {
        type: Date,
    },
    news: {
        type: String,
    },
    newsdesc: {
        type: String,
    },
    newsdetail: {
        type: String,
    },
    released: {
        type: Date,
    },
    cost1: {
        type: Number,
    },
    cost2: {
        type: Number,
    },
    given: {
        type: Number,
    },
    newsimages: {
        type: Array,
    },
    newsvideo: {
        type: String,

    },
    donations: {
        type: Array,
    }
}, {timestamps: true})


export const ProjectModel = mongoose.model('Project', projectSchema)

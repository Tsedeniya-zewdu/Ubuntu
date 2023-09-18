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
    approval: {
        type: String
    },
    approved: {
        type: Date
    },
    request: {
        type: String
    }
}, {timestamps: true})


export const ProjectModel = mongoose.model('Project', projectSchema)

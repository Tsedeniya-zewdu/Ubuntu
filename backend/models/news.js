import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema({
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
    released: {
        type: Date,
    },
    goal: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    raised: {
        type: Number,
        required: true
    },
    given: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    video: {
        type: String
    }
}, {timestamps: true})


export const NewsModel = mongoose.model('News', newsSchema)

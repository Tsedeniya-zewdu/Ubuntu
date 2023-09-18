import mongoose from 'mongoose'

const Schema = mongoose.Schema

const donationSchema = new Schema(
  {
    txref: {
      type: String,
    },
    donator: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
    fundraiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fundraiser',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    projectId: {
      type: String,
    },
    userId: {
      type: String,
    },
    fundraiserId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    anonymous: {
      type: Boolean,
    },
    phone: {
    type: String,
    },
    email: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
)

export const DonationModel = mongoose.model('Donation', donationSchema)

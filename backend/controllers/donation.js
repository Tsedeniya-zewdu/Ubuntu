import _ from 'lodash'
import mongoose from 'mongoose'
import { ObjectId } from 'mongoose'
import { DonationModel } from './../models/donation.js'
import chapa from 'chapa'
import { sendEmail } from '../utils/sendEmail.js'
import { FundraiserModel } from '../models/fundraiser.js'

export const getDonations = async (req, res) => {
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
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

export const getProjectDonations = async (req, res) => {
  const { id } = req.params
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
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
}

// get donations data per project
export const getDonationGraphData = async (req, res) => {
  const { id } = req.params
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
    { $sort: { updatedAt: -1 } },
  ])
  res.status(200).send(joinedData)
  
}

export const getUserDonations = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

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
        userId: id,
      },
    },
    { $sort: { updatedAt: -1 } },
  ])

  if (!joinedData) {
    return res.status(404).json({ error: 'No such donations' })
  }
  res.status(200).send(joinedData)
}

export const getFundraiserDonations = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

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
        fundraiserId: id,
      },
    },
    { $sort: { updatedAt: -1 } },
  ])

  if (!joinedData) {
    return res.status(404).json({ error: 'No such donations' })
  }
  res.status(200).send(joinedData)
}

export const createDonation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.project)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let donation = new DonationModel(
    _.pick(req.body, [
      'donator',
      'user',
      'fundraiser',
      'project',
      'amount',
      'status',
      'anonymous',
      'phone',
      'email',
      'comment',
      'projectId',
      'userId',
      'fundraiserId',
      'txref',
    ]),
  ) // new donation

  if (req.body.project) await donation.save() // add donation to database

  res.status(200).json(donation)
}

export const verifyDonation = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    return res.status(404).json({ error: 'No such project' })
  }

  let myChapa = new chapa('CHASECK_TEST-UCj5jsE1E1mHeFcnSKaz8MA133m7RcdF')

  myChapa
    .verify(req.params.txRef)
    .then((response) => {
      if (response.status == 'success') {
        const addDonation = async () => {
          let donator = response.data.first_name + ' ' + response.data.last_name
          let user = req.params.userId
          let fundraiser = req.params.fundraiserId
          let project = req.params.projectId
          let status = response.status
          let amount = response.data.amount - response.data.charge
          let anonymous =
            response.data.customization.title == 'True' ? true : false
          let phone = response.data.phone
          let email = response.data.email
          let comment = response.data.customization.description
          let projectId = req.params.projectId
          let userId = req.params.userId
          let fundraiserId = req.params.fundraiserId
          let txref = response.data.tx_ref
          console.log(response.data)
          if (user != 'none') {
            const donation = await DonationModel.create({
              donator,
              user,
              fundraiser,
              project,
              status,
              amount,
              anonymous,
              phone,
              email,
              comment,
              projectId,
              userId,
              fundraiserId,
              txref,
            })
          } else {
            const donation = await DonationModel.create({
              donator,
              fundraiser,
              project,
              status,
              amount,
              anonymous,
              phone,
              email,
              comment,
              projectId,
              userId,
              fundraiserId,
              txref,
            })
          }
        }
        addDonation().then(() => {
          const sendEmailToFundraiser = async () => {
            let owner = await FundraiserModel.findOne({
              _id: req.params.fundraiserId,
            })
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
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Recieved Donation</h1>
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
                  <p style="margin: 0;">To see the details, please click the button below.</p>
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
                                  <a href="http://localhost:3000/projects/${req.params.projectId}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">View Donation</a>
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
            // const link = `http://localhost:3000/projects/${req.params.projectId}`
            await sendEmail(owner.email, 'Received donation', link)
          }
          sendEmailToFundraiser()
          res.redirect('http://localhost:3000/thankyou')
        })
      }
    })
    .catch((e) => {
      console.log(e)
      res.redirect('http://localhost:3000/error')
    }) // catch errors
}

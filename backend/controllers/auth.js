import _ from 'lodash'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail.js'
import {
  UserModel,
  validateUserSignup,
  validateUserLogin,
} from '../models/User.js'
import { FundraiserModel } from '../models/fundraiser.js'
import { AdminModel, validateAdminSignup } from '../models/admin.js'
import { TokenModel } from './../models/token.js'
import Joi from 'joi'

export const currentUser = async (req, res) => {
  res.status(200).send('Current user api is working')
}

export const register = async (req, res) => {
  if (req.body.role == 'User' || req.body.role == 'Fundraiser') {
    const { error } = validateUserSignup(req.body) // validate user inputs
    if (error) return res.status(400).send(error.details[0].message)
  } 
  if (req.body.role == 'Admin') {
    const { error } = validateAdminSignup(req.body) // validate user inputs
    if (error) return res.status(400).send(error.details[0].message)
  }
  let user = await UserModel.findOne({ email: req.body.email }) // check registered user with this email
  let fundraiser = await FundraiserModel.findOne({ email: req.body.email }) // check registered fundraiser with this email
  let admin = await AdminModel.findOne({ email: req.body.email }) // check registered admin with this email
  // if (user || fundraiser || admin)
  //   return res.status(400).send('User already registered') // already registered

  if (user && req.body.role == 'User')
    return res.status(400).send('User already registered') // User already registered
  if (fundraiser && req.body.role == 'Fundraiser')
    return res.status(400).send('Fundraiser already registered') // Fundraiser already registered
  if (fundraiser && req.body.role == 'Admin')
    return res.status(400).send('Admin already registered') // Admin already registered

  let data = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    image: 'profile-icon.png',
    login: new Date(),
    verified: false,
    type: req.body.type
  }
  if (req.body.role == 'User') {
    user = new UserModel(data) // new user
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt) // hash password

    await user.save() // add user to database

    let token = await TokenModel.findOne({ userId: user._id })
    if (!token) {
      token = await new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

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
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Verify your Email address</h1>
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
          <p style="margin: 0;">To verify your account, please click the button below.</p>
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
                          <a href="http://localhost:5000/api/auth/email-validation/${user._id}/${token.token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Now</a>
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
              <p style="margin: 0;">This verification link will expire in 1 hour.</p>
             
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

    // const link = `http://localhost:5000/api/auth/email-validation/${user._id}/${token.token}`
    await sendEmail(user.email, 'Email Verfication', link)

    res.send('Email verfication link is sent to your email')
  } else if (req.body.role == 'Fundraiser') {
    fundraiser = new FundraiserModel(data) // new fundraiser
    const salt = await bcrypt.genSalt(10)
    fundraiser.password = await bcrypt.hash(fundraiser.password, salt) // hash password

    await fundraiser.save() // add user to database

    let token = await TokenModel.findOne({ userId: fundraiser._id })
    if (!token) {
      token = await new TokenModel({
        userId: fundraiser._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

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
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Verify your Email address</h1>
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
          <p style="margin: 0;">To verify your account, please click the button below.</p>
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
                          <a href="http://localhost:5000/api/auth/email-validation/${fundraiser._id}/${token.token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Now</a>
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
              <p style="margin: 0;">This verification link will expire in 1 hour.</p>
             
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

    // const link = `<a href="http://localhost:5000/api/auth/email-validation/${fundraiser._id}/${token.token}">Verify your account</a>`
    await sendEmail(fundraiser.email, 'Email Verfication', link)

    res.send('Email verfication link is sent to your email')
  } else if (req.body.role == 'Admin') {
    admin = new AdminModel(data) // new admin
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(admin.password, salt) // hash password

    await admin.save() // add user to database

    const token = admin.generateAuthToken() // generate jwt token

    res
      .header('x-auth-token', token)
      .send(_.pick(admin, ['_id', 'name', 'type', 'email', 'role', 'image'])) // send jwt token to client
  }
}

export const login = async (req, res) => {
  const { error } = validateUserLogin(req.body) // validate user inputs
  if (error) return res.status(400).send(error.details[0].message)

  let user = await UserModel.findOne({ email: req.body.email }) // check registered user with this email
  let fundraiser = await FundraiserModel.findOne({ email: req.body.email }) // check registered fundraiser with this email
  let admin = await AdminModel.findOne({ email: req.body.email }) // check registered admin with this email
  if (!user && !fundraiser && !admin)
    return res.status(400).send('Invalid email or password') // No user

  if (user && req.body.role == 'User') {
    const validPassword = await bcrypt.compare(req.body.password, user.password) //check password match
    if (!validPassword) return res.status(400).send('Invalid email or password') // Password didn't matched

    if (user.verified) {
      const token = user.generateAuthToken() // generate jwt token

      return res
        .header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'name', 'email', 'role', 'image', 'login'])) // send jwt token to client  // send token to client
    } else {
      return res.status(400).send('Your email is not verified!')
    }
  } else if (fundraiser && req.body.role == 'Fundraiser') {
    const validPassword = await bcrypt.compare(
      req.body.password,
      fundraiser.password,
    ) //check password match
    if (!validPassword) return res.status(400).send('Invalid email or password') // Password didn't matched

    if (fundraiser.verified) {
      const token = fundraiser.generateAuthToken() // generate jwt token

      return res
        .header('x-auth-token', token)
        .send(
          _.pick(fundraiser, [
            '_id',
            'name',
            'email',
            'role',
            'image',
            'login',
          ]),
        ) // send jwt token to client  // send token to client
    } else {
      return res.status(400).send('Your email is not verified!')
    }
  } else if (admin && req.body.role == 'Admin') {
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password,
    ) //check password match
    if (!validPassword) return res.status(400).send('Invalid email or password') // Password didn't matched

    const token = admin.generateAuthToken() // generate jwt token

    return res
      .header('x-auth-token', token)
      .send(_.pick(admin, ['_id', 'name', 'type', 'email', 'role', 'image'])) // send jwt token to client  // send token to client
  }
  return res.status(400).send('Invalid email or password')
}

export const logout = async (req, res) => {
  if (req.body.role == 'User') {
    await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        login: new Date(),
      },
    )
  } else if (req.body.role == 'Fundraiser') {
    await FundraiserModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        login: new Date(),
      },
    )
  }
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}

export const emailValidation = async (req, res) => {
  const user = await UserModel.findById(req.params.userId)
  const fundraiser = await FundraiserModel.findById(req.params.userId)
  if (!user && !fundraiser)
    return res.status(400).send('invalid link or expired')

  if (user) {
    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send('Invalid link or expired')
    await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { verified: true },
    )
  } else if (fundraiser) {
    const token = await TokenModel.findOne({
      userId: fundraiser._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send('Invalid link or expired')
    await FundraiserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { verified: true },
    )
  }
  await TokenModel.findOneAndDelete({ userId: req.params.userId })

  res.redirect('http://localhost:3000/email-verified') // redirect to login page
}

export const forgetPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  const fundraiser = await FundraiserModel.findOne({ email: req.body.email })
  if (!user && !fundraiser)
    return res.status(400).send("account with given email doesn't exist")
  if (user && req.body.role == 'User') {
    let token = await TokenModel.findOne({ userId: user._id })
    if (!token) {
      token = await new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

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
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Password change</h1>
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
          <p style="margin: 0;">To change your password, please click the button below.</p>
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
                          <a href="http://localhost:5000/api/auth/password-reset/${user._id}/${token.token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Change Password</a>
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
              <p style="margin: 0;">This verification link will expire in 1 hour.</p>
             
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

    await sendEmail(user.email, 'Password reset', link)
    return res.status(200).send('password reset link sent successfully')
  } else if (fundraiser && req.body.role == 'Fundraiser') {
    let token = await TokenModel.findOne({ userId: fundraiser._id })
    if (!token) {
      token = await new TokenModel({
        userId: fundraiser._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

    const link = `http://localhost:5000/api/auth/password-reset/${fundraiser._id}/${token.token}`
    await sendEmail(fundraiser.email, 'Password reset', link)
    return res.status(200).send('password reset link sent successfully')
  }
  return res.status(400).send("account with given email doesn't exist")
}

export const passwordReset = async (req, res) => {
  const user = await UserModel.findById(req.params.userId)
  const fundraiser = await FundraiserModel.findById(req.params.userId)
  if (!user && !fundraiser)
    return res.status(400).send('invalid link or expired')

  if (user) {
    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send('Invalid link or expired')
  } else if (fundraiser) {
    const token = await TokenModel.findOne({
      userId: fundraiser._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send('Invalid link or expired')
  }
  await TokenModel.findOneAndDelete({ userId: req.params.userId })

  res.redirect(`http://localhost:3000/reset/${req.params.userId}`) // redirect to password reset page
}

export const newPassword = async (req, res) => {
  const user = await UserModel.findById(req.body.id)
  const fundraiser = await FundraiserModel.findById(req.body.id)
  if (!user && !fundraiser) return res.status(400).send('invalid id')

  if (user) {
    const salt = await bcrypt.genSalt(10)
    let newPassword = await bcrypt.hash(req.body.password, salt) // hash password
    await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      { password: newPassword },
    )
  } else if (fundraiser) {
    const salt = await bcrypt.genSalt(10)
    let newPassword = await bcrypt.hash(req.body.password, salt) // hash password
    await FundraiserModel.findOneAndUpdate(
      { _id: req.body.id },
      { password: newPassword },
    )
  }

  res.status(200).send('Password updated successfully')
}

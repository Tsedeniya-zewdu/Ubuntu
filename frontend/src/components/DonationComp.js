import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import img1 from '../assets/credit-cards.png'
import img2 from '../assets/ethio-payment.png'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const DonationComp = (props) => {
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const { pid } = useParams()
  let user = currentUser ? currentUser._id : ''

  const [inputs, setInputs] = useState({
    donator: currentUser ? currentUser.name : '',
    amount: null,
    status: 'Success',
    type: 'Domestic',
    anonymous: false,
    phone: null,
    country: '',
    email: '',
    card: null,
    date: '',
    cvc: null,
    comment: '',
    terms: false,
  })

  const [paymentMethod, setPaymentMethod] = React.useState('ethiopian')

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value)
  }

  const [anonymousChecked, setAnonymousChecked] = useState(false)
  const handleAnonymousCheck = (event) => {
    setAnonymousChecked(event.target.checked)
  }

  const [termsChecked, setTermsChecked] = useState(false)
  const handleTermssCheck = (event) => {
    setTermsChecked(event.target.checked)
  }
  const [showErr, setShowErr] = useState()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDomesticDonate = async (e) => {
    e.preventDefault()
    if (!termsChecked) {
      setShowErr("Please read and agree to our terms!")
    } else {
      let donation = {
        user: user,
        fundraiser: props.project.fundraiser,
        project: props.project._id,
        donator: currentUser ? currentUser.name : inputs.donator,
        amount: inputs.amount,
        status: 'Success',
        type: 'Domestic',
        anonymous: anonymousChecked,
        phone: inputs.phone,
        email: '',
        country: 'Ethiopia',
        card: null,
        date: new Date(),
        cvc: null,
        comment: inputs.comment,
        terms: termsChecked,
        projectId: props.project._id,
        userId: currentUser ? currentUser._id : '' ,
        fundraiserId: props.project.fundraiser
      }
      // console.log(donation)
      const res = await axios.post('/donations/', donation)
      try {
        // console.log('Documents: ', res.data)
        navigate('/thankyou')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleInternationalDonate = async (e) => {
    e.preventDefault()
    if (!termsChecked) {
      setShowErr("Please read and agree to our terms!")
    } else {
      let donation = {
        user: user,
        fundraiser: props.project.fundraiser,
        project: props.project._id,
        donator: currentUser ? currentUser.name : inputs.donator,
        amount: inputs.amount,
        status: 'Success',
        type: 'International',
        anonymous: anonymousChecked,
        phone: null,
        email: inputs.email,
        country: inputs.country,
        card: inputs.card,
        cvc: inputs.cvc,
        comment: inputs.comment,
        date: new Date(),
        terms: termsChecked,
        projectId: props.project._id,
        userId: currentUser ? currentUser._id : '' ,
        fundraiserId: props.project.fundraiser
      }

      // console.log(donation)

      const res = await axios.post('/donations/', donation)
      try {
        // console.log('Documents: ', res.data)
        navigate('/thankyou')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Box
      id="donation-form"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: '16px',
        pt: { xs: '60px', md: '110px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          display: 'flex',
          gap: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },

          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: { xs: '100%', md: '50%' },
            img: {
              maxHeight: '647px',
              maxWidth: { xs: '500px', md: '584px' },
              width: '100%',
            },
          }}
        >
          <img src="/images/donation-form-img-1.png" alt="form img" />
        </Box>
        {/* Right Side */}
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            sx={{
              fontSize: '26px',
              fontWeight: '700',
              color: '#1f2230',
              pb: { xs: '20px' },
            }}
          >
            Make Donation
          </Typography>

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Select a Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={paymentMethod}
              onChange={handlePaymentMethod}
              row
            >
              <FormControlLabel
                value="ethiopian"
                control={<Radio />}
                label="Ethiopian"
              />
              <FormControlLabel
                value="international"
                control={<Radio />}
                label="International"
              />
            </RadioGroup>
          </FormControl>
          {/* Ethiopian Payment Form */}
          {paymentMethod === 'ethiopian' && (
            <form>
              <Box>
                <Box
                  sx={{
                    my: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    img: { maxWidth: '350px', width: '60%' },
                  }}
                >
                  <Typography>Payment Options</Typography>
                  <img src={img2} alt="credit cards" />
                </Box>
                {/* Name and Email  */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '20px',
                    mt: '20px',
                    width: '100%',
                    '>*': { width: { xs: '100%', sm: '50%' } },
                  }}
                >
                  <TextField
                    size="small"
                    name="donator"
                    value={inputs.donator}
                    onChange={handleChange}
                    label="Full Name"
                  />
                  <TextField
                    name="phone"
                    onChange={handleChange}
                    size="small"
                    type="number"
                    label="Phone Number"
                  />
                </Box>
                {/* Donation Ammount */}
                <Box sx={{ display: 'flex', my: '20px' }}>
                  <Box
                    sx={{
                      width: '105px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#029a5b',
                      borderTopLeftRadius: '5px',
                      borderBottomLeftRadius: '5px',
                      mr: '-1px',
                      '>*': { fontWeight: '700', color: '#fff' },
                    }}
                  >
                    <span>Donation</span>
                  </Box>
                  <TextField
                    type="number"
                    label="amount ETB"
                    size="small"
                    name="amount"
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Box>
                {/* Anonymous check box */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={anonymousChecked}
                      onChange={handleAnonymousCheck}
                    />
                  }
                  label="Make me anonymous"
                  size="small"
                  sx={{ mb: '20px' }}
                />
                {/* Comment */}
                <TextField
                  rows={3}
                  multiline={true}
                  label="Leave a comment"
                  sx={{ width: '100%', mb: '20px' }}
                  name="comment"
                  onChange={handleChange}
                />
                {/* Terms */}
                <Box
                  sx={{
                    mb: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsChecked}
                        onChange={handleTermssCheck}
                      />
                    }
                    label="Agree to Terms?"
                  />
                  <Button
                    variant="text"
                    sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                  >
                    Show Terms
                  </Button>
                </Box>
                {showErr && (
                  <Alert sx={{mb: '20px'}} severity="info">{showErr}</Alert>
              )}
                {/* Submit Button */}
                <Box
                  sx={{ mb: '20px', display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    variant="contained"
                    sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                    onClick={handleDomesticDonate}
                  >
                    Donate Now
                  </Button>
                </Box>
              </Box>
            </form>
          )}

          {/* International Payment Form */}
          {paymentMethod === 'international' && (
            <form>
              <Box>
                <Box
                  sx={{
                    my: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    img: { maxWidth: '350px', width: '60%' },
                  }}
                >
                  <Typography>Credit Cards</Typography>
                  <img src={img1} alt="credit cards" />
                </Box>
                {/* Name and Email Field */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '20px',
                    mt: '20px',
                    width: '100%',
                    '>*': { width: { xs: '100%', sm: '50%' } },
                  }}
                >
                  <TextField
                    size="small"
                    value={inputs.donator}
                    onChange={handleChange}
                    label="Full Name"
                  />
                  <TextField
                    size="small"
                    type="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                  />
                </Box>
                {/* Card Info */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '20px',
                    mt: '20px',
                    width: '100%',
                    '>*': { width: { xs: '100%', sm: '50%' } },
                  }}
                >
                  <TextField
                    size="small"
                    label="Card Number"
                    type="number"
                    name="card"
                    onChange={handleChange}
                  />
                  <TextField
                    size="small"
                    type="date"
                    label=""
                    name="date"
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '20px',
                    mt: '20px',
                    width: '100%',
                    '>*': { width: { xs: '100%', sm: '50%' } },
                  }}
                >
                  <TextField
                    size="small"
                    label="CVC"
                    name="cvc"
                    type="number"
                    onChange={handleChange}
                  />
                  <TextField
                    size="small"
                    label="Country"
                    name="country"
                    onChange={handleChange}
                  />
                </Box>

                {/* Donation Amount */}
                <Box sx={{ display: 'flex', my: '20px' }}>
                  <Box
                    sx={{
                      width: '105px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#029a5b',
                      borderTopLeftRadius: '5px',
                      borderBottomLeftRadius: '5px',
                      mr: '-1px',
                      '>*': { fontWeight: '700', color: '#fff' },
                    }}
                  >
                    <span>Donation</span>
                  </Box>
                  <TextField
                    type="number"
                    label="amount $"
                    size="small"
                    sx={{ width: '100%' }}
                    name="amount"
                    onChange={handleChange}
                  />
                </Box>
                {/* Anonymous Check box */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={anonymousChecked}
                      onChange={handleAnonymousCheck}
                    />
                  }
                  label="Make me anonymous"
                  sx={{ mb: '20px' }}
                />
                {/* Comment */}
                <TextField
                  rows={2}
                  multiline={true}
                  label="Leave a comment"
                  sx={{ width: '100%', mb: '20px' }}
                  name="comment"
                  onChange={handleChange}
                />

                {/* Terms */}
                <Box
                  sx={{
                    mb: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsChecked}
                        onChange={handleTermssCheck}
                      />
                    }
                    label="Agree to Terms?"
                  />
                  <Button
                    variant="text"
                    sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                  >
                    Show Terms
                  </Button>
                </Box>
                {showErr && (
                  <Alert sx={{mb: '20px'}} severity="info">{showErr}</Alert>
              )}
                {/* Button */}
                <Box
                  sx={{ mb: '20px', display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    variant="contained"
                    sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                    onClick={handleInternationalDonate}
                  >
                    Donate Now
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  )
}

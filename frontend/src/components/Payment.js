import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import img1 from '../assets/credit-cards.png'
import img2 from '../assets/ethio-payment.png'
import { AuthContext } from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'

export const Payment = (props) => {
  const navigate = useNavigate()

  const {t} = useTranslation()

  const { currentUser } = useContext(AuthContext)
  const { pid } = useParams()
  let user = currentUser ? currentUser._id : 'none'

  const [inputs, setInputs] = useState({
    donator: currentUser ? currentUser.name : '',
    amount: null,
    status: 'Success',
    anonymous: false,
    phone: null,
    email: '',
    comment: '',
    terms: false,
    fname: '',
    lname: ''
  })

  let txRef = 'tx-'+uuidv4()

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
            {t('project:donation.1')}
          </Typography>

          <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
            <input
              type="hidden"
              name="public_key"
              value="CHAPUBK_TEST-tHVo8f6EXiVNEaOSpJ6XKwgZlJVXAcv7"
            />
            <input type="hidden" id="tx_ref" name="tx_ref" value={txRef} />
            <input type="hidden" name="amount" value={inputs.amount} />
            <input type="hidden" name="currency" value="ETB" />
            <input type="hidden" name="phone" value={inputs.phone} />
            <input type="hidden" name="email" value={inputs.email} />
            <input type="hidden" name="first_name" value={inputs.fname} />
            <input type="hidden" name="last_name" value={inputs.lname} />
            <input type="hidden" name="title" value={anonymousChecked ? 'True' : 'False'} />
            <input
              type="hidden"
              name="description"
              value={inputs.comment}
            />
            <input
              type="hidden"
              name="logo"
              value="https://chapa.link/asset/images/chapa_swirl.svg"
            />
            <input
              type="hidden"
              name="callback_url"
              value=""
            />
            <input
              type="hidden"
              name="return_url"
              value={`http://localhost:5000/api/donations/verify/${txRef}/${props.project._id}/${props.project.fundraiser}/${user}`}
            />
            <input type="hidden" name="meta[title]" value="test" />
            <Box>
              <Box
                sx={{
                  my: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>{t('project:donation.2')}</Typography>
                <Box
                  sx={{
                    my: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    img: { maxWidth: '350px', width: '100%' },
                  }}
                >
                  <img src={img1} alt="credit cards" />
                  <img src={img2} alt="credit cards" />
                </Box>
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
                  name="fname"
                  onChange={handleChange}
                  label={t('project:donation.3')}
                  required
                />
                <TextField
                  size="small"
                  type="text"
                  label={t('project:donation.4')}
                  name="lname"
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
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  label={t('project:donation.5')}
                  required
                />
                <TextField
                  size="small"
                  type="email"
                  label={t('project:donation.6')}
                  name="email"
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
                  <span>{t('project:donation.7')}</span>
                </Box>
                <TextField
                  type="number"
                  label={t('project:donation.8')}
                  size="small"
                  sx={{ width: '100%' }}
                  name="amount"
                  required
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
                label={t('project:donation.9')}
                sx={{ mb: '20px' }}
              />
              {/* Comment */}
              <TextField
                rows={2}
                multiline={true}
                label={t('project:donation.10')}
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
                  label={t('project:donation.11')}
                />
                <a href='/terms' target='_blank'>
                <Button
                  variant="text"
                  
                  sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                >
                  {t('project:donation.12')}
                </Button>
                </a>
              </Box>
              {showErr && (
                <Alert sx={{ mb: '20px' }} severity="info">
                  {showErr}
                </Alert>
              )}
              {/* Button */}
              <Box
                sx={{ mb: '20px', display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant="contained"
                  sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                  // onClick={handleDonate}
                  type="submit"
                  // onClick={handleDonate}
                >
                 {t('project:donation.13')}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

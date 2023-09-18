import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import { AuthContext } from './../context/AuthContext'

export const OTPInput = () => {
  // For holding otp input
  const [otpInput, setOtpInput] = useState()

  // For showing loging Errors
  const [showErr, setShowErr] = useState(null)

  // For redirecting
  const navigate = useNavigate()

  const { sentOTP, email, } = useContext(AuthContext)
  // console.log(currentUser)

  // Collecting inputs data
  const handleChange = (e) => {
    setOtpInput(e.target.value)
  }

  // Sending inputs data
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('From OTP input otpInput:')
    console.log(otpInput)
    console.log('From OTP input otp:')
    console.log(sentOTP)
    //compare input otp with sent otp
    if (sentOTP == otpInput) {
      console.log('Otp matched')
      navigate('/reset')
    }

  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: '150px', sm: '200px', md: '250px' },
              m: 1,
              img: { width: '100%' },
            }}
          >
            <img src="/images/logo.png" alt="logo" />
          </Box>
          <Typography component="h1" variant="h5">
            Email Verification
          </Typography>
          <Typography variant="body2">
            Please enter the 4 digits code We have sent to your email address:{' '}
            {email}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Verification Code"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Verify Account
            </Button>

            <Grid container>
              {showErr && (
                <Grid item xs sx={{ p: '20px' }}>
                  <Alert severity="error">{showErr}</Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5, '>*': { color: '#029a5b' } }}
        >
          {"Didn't recieve code? "}

          <NavLink to="/">Resend Email</NavLink>
        </Typography>
      </Container>
    </div>
  )
}

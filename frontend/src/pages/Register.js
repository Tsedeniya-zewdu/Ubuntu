import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Alert,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { AuthContext } from './../context/AuthContext'
import { useTranslation } from 'react-i18next'

export const Register = () => {
  // For holding inputs data
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    role: 'User',
  })

  // For showing loging Errors
  const [showErr, setShowErr] = useState(null)

  // For redirecting
  const navigate = useNavigate()

  // Collecting inputs data
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(inputs)
  }

  const { email, setEmail, sendOTP, currentUser, register } = useContext(
    AuthContext,
  )

  if (email) {
    let randomOtp = Math.floor(Math.random() * 9000 + 1000)
    sendOTP(randomOtp, email)
  }
  // Sending inputs data
  const handleSubmit = async (e) => {
    e.preventDefault()
    register(inputs)
      .then((res) => {
        setShowErr(null)
        navigate('/email-verification')
      })
      .catch((err) => {
        setShowErr(err.response.data)
        console.log('From Error ===>')
        console.log(err)
      })
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role == 'User') {
        navigate('/user')
      } else if (currentUser.role == 'Fundraiser') {
        navigate('/fundraiser')
      }
    }
  }, [currentUser])

  const {t} = useTranslation()

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
          <Button onClick={()=> navigate('/')}
            sx={{
              maxWidth: { xs: '150px', sm: '200px', md: '250px' },
              m: 1,
              img: { width: '100%' },
            }}
          >
            <img src="/images/logo.png" alt="logo" />
          </Button>
          <Typography component="h1" variant="h5">
            {t('register.1')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="role"
                value={inputs.role}
                onChange={handleChange}
                row
              >
                {' '}
                <Box className="account-type-wrapper">
                  <Box className="account-type-box">
                    <FormControlLabel
                      value="User"
                      control={<Radio />}
                      label={t('register.2')}
                    />{' '}
                  </Box>
                  <Box className="account-type-box">
                    <FormControlLabel
                      value="Fundraiser"
                      control={<Radio />}
                      label={t('register.3')}
                    />
                  </Box>{' '}
                </Box>
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label={t('register.4')}
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('register.5')}
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('register.6')}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
             {t('register.7')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" sx={{ '>a': { color: '#029a5b' } }}>
                  <NavLink to="/login">
                    {t('register.8')}
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
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
          sx={{ mt: 5, '>*': { color: 'inherit' } }}
        >
          { t('register.10')}{' © '}

          <NavLink to="/">{t('register.9')} </NavLink>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </div>
  )
}

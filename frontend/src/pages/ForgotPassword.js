import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { Alert, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { AuthContext } from './../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const ForgotPassword = () => {
  // For showing loging Errors
  const [showErr, setShowErr] = useState(null)

  // For redirecting
  const navigate = useNavigate()

  const {t} = useTranslation()

  const [inputs, setInputs] = useState({
    email: '',
    role: 'User'
  })

  // console.log(currentUser)

  // Get email input
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputs.email) {
      let res = await axios.post('/auth/forget-password', inputs)
        .then(() => {
          setShowErr(null)
          navigate('/password-reset-link')
        })
        .catch((err) => {
          console.log(err)
          setShowErr(err.response.data)
      })
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
          <Box onClick={()=> navigate('/')}
            sx={{
              maxWidth: { xs: '150px', sm: '200px', md: '250px' },
              m: 1,
              cursor: 'pointer',
              img: { width: '100%' },
            }}
          >
            <img src="/images/logo.png" alt="logo" />
          </Box>
          <Typography component="h1" variant="h6" sx={{textAlign: 'center', py: '20px', fontWeight: '400'}}>
            {t('forgot.1')}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
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
                      label={t('forgot.2')}
                    />{' '}
                  </Box>
                  <Box className="account-type-box">
                    <FormControlLabel
                      value="Fundraiser"
                      control={<Radio />}
                      label={t('forgot.3')}
                    />
                  </Box>{' '}
                </Box>
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('forgot.4')}
              name="email"
              type='email'
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
              onClick={handleSubmit}
            >
              {t('forgot.5')}
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
      </Container>
    </div>
  )
}

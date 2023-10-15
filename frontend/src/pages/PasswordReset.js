import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '@mui/material'
import { AuthContext } from './../context/AuthContext'
import axios from 'axios'
import { t } from 'i18next'

export const PasswordReset = () => {
  // For holding inputs data
  const [inputs, setInputs] = useState({
    password1: '',
    password2: '',
  })

  const {id} = useParams()
  // For showing loging Errors
  const [showErr, setShowErr] = useState(null)

  // For redirecting
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)
  // console.log(currentUser)

  // Collecting inputs data
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Sending inputs data
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputs.password1 === inputs.password2) {
      let data = {
        id: id,
        password: inputs.password1
      }
      let res = await axios.post('/auth/update-password', data)
      try {
        setShowErr(null)
        navigate('/password-reseted')
      } catch (err) {
        console.log(err)
      }
    } else {
      setShowErr(t('reset.1'))
    }
    // login(inputs)
    //   .then((res) => {
    //     // console.log(res)
    //     // Redirecting user to login page after registering successfully
    //     navigate('/create-project')
    //     setShowErr(null)
    //   })
    //   .catch((err) => {
    //     setShowErr(err.response.data)
    //     console.log(err)
    //   })
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
          <Typography component="h1" variant="h6" sx={{fontWeight: '400', py: '20px'}}>
            {t('reset.2')}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password1"
              type="password"
              label={t('reset.3')}
              name="password1"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label={t('reset.4')}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              {t('reset.5')}
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

import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { AuthContext } from './../context/AuthContext'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  // For holding inputs data
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    role: 'User',
  })

  // For showing loging Errors
  const [showErr, setShowErr] = useState(null)

  // For redirecting
  const navigate = useNavigate()

  const { login, currentUser } = useContext(AuthContext)
  console.log(currentUser)

  // Collecting inputs data
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Sending inputs data
  const handleSubmit = async (e) => {
    e.preventDefault()

    login(inputs)
      .then((res) => {
        setShowErr(null)
      })
      .catch((err) => {
        setShowErr(err.response.data)
        console.log(err)
      })
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role == 'User') {
        navigate('/user')
      } else if (currentUser.role == 'Fundraiser') {
        navigate('/fundraiser')
      } else if (currentUser.role == 'Admin') {
        navigate('/admin')
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
            {t('login.1')}
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
                      label={t('login.2')}
                    />{' '}
                  </Box>
                  <Box className="account-type-box">
                    <FormControlLabel
                      value="Fundraiser"
                      control={<Radio />}
                      label={t('login.3')}
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
              label={t('login.4')}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('login.5')}
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
              {t('login.6')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" sx={{ '>a': { color: '#029a5b' } }}>
                  <NavLink to="/forgot">{ t('login.7')}</NavLink>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ '>a': { color: '#029a5b' } }}>
                  <NavLink to="/register">
                    {t('login.8')}
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
          { t('login.10')}{' ©  '}

          <NavLink to="/">{t('login.9')} </NavLink>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </div>
  )
}

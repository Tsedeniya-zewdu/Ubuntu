import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const EmailVerified = () => {

  // For redirecting
  const navigate = useNavigate()

  const {t} = useTranslation()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
          <Typography sx={{py: '15px', color: '#029a5b', textAlign: 'center'}} component="h1" variant="h5">
           {t('verify.6')}
          </Typography>
          {/* <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: '400'}}>
           Please click on the button below to login to your account!
          </Typography> */}
          <Box component="form" noValidate sx={{ mt: 3 }}>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, minWidth: '140px' }}
              onClick={()=> navigate('/login')}
            >
              {t('verify.7')}
            </Button>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5, '>*': { color: 'inherit' } }}
        >
          { t('verify.5')}{' © '}

          <NavLink to="/">{t('verify.4')} </NavLink>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  )
}

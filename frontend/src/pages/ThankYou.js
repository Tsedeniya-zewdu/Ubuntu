import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'
import { t } from 'i18next'

export const ThankYou = () => {
  const {txRef} = useParams()

  // For redirecting
  const navigate = useNavigate()

  


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
          <Typography sx={{py: '15px', color: '#029a5b'}} component="h1" variant="h5">
           {t('thankyou.1')}
          </Typography>
          <Typography component="h1" variant="h5">
           {t('thankyou.2')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> navigate('/')}
            >
             {t('thankyou.3')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

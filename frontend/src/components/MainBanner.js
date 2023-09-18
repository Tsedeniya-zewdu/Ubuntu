import { Box } from '@mui/material'
import React from 'react'
import { Typography } from '@mui/material'
import img1 from '../assets/banner-img-1.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { StyledButton } from './Common'
import { useNavigate } from 'react-router-dom'

export const MainBanner = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          px: "16px",
          pt: { xs: '20px', sm: '30px', md: '40px' },
        }}
      >
        <Box
          sx={{
            maxWidth: 'lg',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              pb: { xs: '40px', sm: '60px', md: '80px' },
              display: { xs: 'flex', sm: 'block' },
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: { xs: '350px', sm: 'none' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'roboto',
                fontWeight: '700',
                fontSize: {
                  xs: '25px',
                  sm: '38px',
                  md: '60px',
                  lg: '75px',
                  xl: '80px',
                },
                color: '#383636',
              }}
            >
              I am,  Because<br/>We are!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '380px',
                pl: '20px',
                borderLeft: '3px solid #029a5b',
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                // lineHeight: '27px',
                color: '#383636',
                mt: { xs: '20px', sm: '30px', md: '40px' },
              }}
            >
              Ubuntu - Empowering Hopeful Hearts Worldwide
            </Typography>
            <StyledButton
              variant="contained"
              onClick={()=> navigate('/project/All')}
              endIcon={
                <ArrowForwardIosIcon sx={{ width: '12px', height: '12px' }} />
              }
              sx={{
                mt: { xs: '20px', sm: '30px', md: '40px' },
              }}
            >
              Make Donation
            </StyledButton>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              maxWidth: { xs: '350px', sm: 'none' },
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'hidden',
              img: {
                width: '100%',
                objectFit: 'fill',
                objectPosition: 'top',
                pr: {xs: "0", md: "20px"}
              },
            }}
          >
            <img src={img1} alt="banner" />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

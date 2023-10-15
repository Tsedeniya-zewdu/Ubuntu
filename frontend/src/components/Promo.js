import { Box, Typography } from '@mui/material'
import React from 'react'
import { StyledButton } from './Common'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Promo = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: "16px",
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          backgroundImage: "url('images/bg-lines-transparent.png')",
          backgroundColor: '#029a5b',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          p: { xs: '50px 20px', md: '65px 35px' },
          display: 'flex',
          alignItems: {xs: 'left', md: 'center'},
          justifyContent: {xs: "center", md: "space-between"} ,
          flexDirection: {xs: "column", md: "row"},
          '>*': {
            color: '#fff',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '30px', md: '40px' },
            fontWeight: '700',
          }}
        >
          {t('home:promo.1')}
        </Typography>
        <StyledButton
          variant="outlined"
          endIcon={
            <ArrowForwardIosIcon sx={{ width: '12px', height: '12px' }} />
          }
          onClick={()=> navigate('/about')}
          sx={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            maxWidth: "150px",
            mt: { xs: "20px", md: "0" },
            p: "5px 20px",
            color: '#fff',
            '&:hover': {
              border: '1px solid #bdbdbd',
            },
          }}
        >
          {t('home:promo.2')}
        </StyledButton>
      </Box>
    </Box>
  )
}

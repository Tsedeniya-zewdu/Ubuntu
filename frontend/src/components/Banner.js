import { Box } from '@mui/material'
import React from 'react'
import { StyledText2 } from './Common'

export const Banner = (props) => {
  return (
    <Box className='banner-wrapper'
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: '400px',
        backgroundColor: '#1f2230',
        px: "16px",
        py: { xs: '60px', md: '110px' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className='banner-overlay'></div>
      <div className='banner-img-wrapper'>
        <img src={props.img} />
      </div>
      <Box className='banner-title'
        sx={{
          maxWidth: 'lg',
        }}
      >
        <StyledText2
          gutterBottom
          variant="h2"
          
          sx={{
              fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' },
            color: "#fff",
             
          }}
        >
          {props.title}
        </StyledText2>
      </Box>
    </Box>
  )
}

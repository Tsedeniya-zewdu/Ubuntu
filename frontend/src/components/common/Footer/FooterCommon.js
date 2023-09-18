import React from 'react'
import "./FooterCommon.scss"
import  CopyrightIcon  from '@mui/icons-material/Copyright';
import { Typography } from '@mui/material';

export const FooterCommon = () => {
  return (
      <div className='container-wrapper footer-common-wrapper'>
          <div className='container footer-common'>
          <CopyrightIcon />
          <Typography variant="body2">
            2023 Ubuntu. All right reserved{' '}
          </Typography>
          </div>
    </div>
  )
}

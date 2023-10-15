import React from 'react'
import "./FooterCommon.scss"
import  CopyrightIcon  from '@mui/icons-material/Copyright';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const FooterCommon = () => {

  const {t} = useTranslation()

  return (
      <div className='container-wrapper footer-common-wrapper'>
          <div className='container footer-common'>
          <CopyrightIcon />
          <Typography variant="body2">
            {t('footer.copyright')}
          </Typography>
          </div>
    </div>
  )
}

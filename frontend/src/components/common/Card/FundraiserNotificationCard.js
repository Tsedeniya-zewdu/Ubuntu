import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const FundraiserNotificationCard = (props) => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
      <Card className={props.new ? 'fundraiser-notification-card new' : 'fundraiser-notification-card'}>
          <div className='img-wrapper'>
              <img src={`http://localhost:5000/api/uploads/${props.img}`} alt="notification-img" />
          </div>
          <div className="texts-wrapper">
<div>
<Typography><span className='bold'>{t('fundraiser:notification.1')}</span ><span>{props.name}</span> | <span className='bold'> {t('fundraiser:notification.2')}</span> <span>{props.donated} {t('fundraiser:notification.3')} </span> | <span className='bold'>{t('fundraiser:notification.4')}</span><span className='light'>{props.title}</span></Typography>
  <Typography>
    <span className="bold">{t('fundraiser:notification.5')}</span>
    <span className="light">
      {props.raised} {t('fundraiser:notification.3')}
    </span>{' '}
    | <span className="bold">{t('fundraiser:notification.6')} </span>
    <span className="light">{props.goal} {t('fundraiser:notification.3')}</span>
  </Typography>

  <Typography className="light">{props.time}</Typography>
</div>

<Button
  className="btn"
  onClick={() => {
    navigate(`/fundraiser-details/${props.id}`)
  }}
>
  {t('btn.4')}
</Button>
</div>
    </Card>
  )
}



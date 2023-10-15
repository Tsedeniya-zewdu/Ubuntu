import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const UserNotificationCard = (props) => {
  const navigate = useNavigate()

  const {t} = useTranslation()

  return (
    <Card className={props.new? "user-notification-card new" : "user-notification-card"}>
      <div className="img-wrapper">
        <img src={`http://localhost:5000/api/uploads/${props.img}`} alt="notification-img" />
      </div>
      <div className="texts-wrapper">
        <div>
          <Typography>
            <span className="bold">{props.name} </span> {t('user:notification.1')}{' '}
            <span className="light">{props.title}</span>
          </Typography>
          <Typography>
            <span className="bold">{t('user:notification.2')}</span>
            <span className="light">
              {props.raised} {t('user:notification.3')} ({props.percent}%)
            </span>{' '}
            | <span className="bold">{t('user:notification.4')}</span>
            <span className="light">{props.goal} {t('user:notification.3')}</span> |{' '}
            <span className="bold">{t('user:notification.5')}</span>
            <span className="light">{props.days}</span>
          </Typography>

          <Typography className="light">{props.time}</Typography>
        </div>

        <Button
          className="btn"
          onClick={() => {
            navigate(`/projects/${props.id}`)
          }}
        >
          {t('btn.4')}
        </Button>
      </div>
    </Card>
  )
}

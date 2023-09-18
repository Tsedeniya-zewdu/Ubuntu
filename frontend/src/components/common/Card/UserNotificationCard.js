import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const UserNotificationCard = (props) => {
  const navigate = useNavigate()
  return (
    <Card className={props.new? "user-notification-card new" : "user-notification-card"}>
      <div className="img-wrapper">
        <img src={`http://localhost:5000/api/uploads/${props.img}`} alt="notification-img" />
      </div>
      <div className="texts-wrapper">
        <div>
          <Typography>
            <span className="bold">{props.name} </span> posted new project:{' '}
            <span className="light">{props.title}</span>
          </Typography>
          <Typography>
            <span className="bold">Raised Amount: </span>
            <span className="light">
              {props.raised} ETB ({props.percent}%)
            </span>{' '}
            | <span className="bold">Goal: </span>
            <span className="light">{props.goal} ETB</span> |{' '}
            <span className="bold">Days Left: </span>
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
          View Details
        </Button>
      </div>
    </Card>
  )
}

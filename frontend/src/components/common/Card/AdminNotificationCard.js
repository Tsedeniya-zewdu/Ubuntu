import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminNotificationCard = (props) => {
  const navigate = useNavigate()
  return (
    <Card className={props.new ? "fundraiser-notification-card new" : "fundraiser-notification-card"}>
      <div className="img-wrapper">
        <img src={`http://localhost:5000/api/uploads/${props.img}`} alt="img" />
      </div>
      <div className="texts-wrapper">
        <div>
          <Typography>
            <span className="bold name">{props.name} </span>{' '}
            <span>{props.type}d project</span> | <span className="bold name">Status:</span> <span>{props.status}</span>
          </Typography>
          <Typography>
            <span className="bold">Project: </span>
            <span className="light">{props.title}</span>  | <span className="bold name">Approval:</span> <span>{props.approval}</span>
          </Typography>

          <Typography>
            <span className="light">{props.time}</span>
          </Typography>
        </div>

        <Button
          className="btn"
          onClick={() => {
            navigate(`/admin-project-details/${props.id}`)
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  )
}

import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const FundraiserNotificationCard = (props) => {
  const navigate = useNavigate()
  return (
      <Card className={props.new ? 'fundraiser-notification-card new' : 'fundraiser-notification-card'}>
          <div className='img-wrapper'>
              <img src={`http://localhost:5000/api/uploads/${props.img}`} alt="notification-img" />
          </div>
          <div className="texts-wrapper">
<div>
<Typography><span className='bold'>Donator: </span ><span>{props.name}</span> | <span className='bold'> Amount donated:</span> <span>{props.donated} ETB </span> | <span className='bold'>Project: </span><span className='light'>{props.title}</span></Typography>
  <Typography>
    <span className="bold">Raised Amount: </span>
    <span className="light">
      {props.raised} ETB
    </span>{' '}
    | <span className="bold">Goal: </span>
    <span className="light">{props.goal} ETB</span>
  </Typography>

  <Typography className="light">{props.time}</Typography>
</div>

<Button
  className="btn"
  onClick={() => {
    navigate(`/fundraiser-details/${props.id}`)
  }}
>
  View Details
</Button>
</div>
    </Card>
  )
}



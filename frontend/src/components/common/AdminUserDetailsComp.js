import React from 'react'
import './ProfileStyles.scss'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const AdminUserDetailsComp = (props) => {
  const navigate = useNavigate()
  return (
    <div className="profile-wrapper user-details">
      <div className="profile">
        <Card className="profile-picture">
          <div className="img-text-wrapper">
            <Typography variant="h6" className="title">
              Profile Picture
            </Typography>
            <img src={`http://localhost:5000/api/uploads/${props.user.image}`} alt="profile pic" />{' '}
          </div>
          <div className="texts">
            <Typography className="name">{props.user.name}</Typography>
          </div>
        </Card>
        <Card className="basic-info">
          <Typography variant="h6" className="title">
            Basic information
          </Typography>
          <div className="text-field-wrapper">
            <Typography className="text">
              <span>Email:</span> <span>{props.user.email}</span>
            </Typography>
            <Typography className="text">
              <span> Phone: </span> <span> {props.user.phone}</span>
            </Typography>
          </div>
        </Card>
      </div>
      <div className="right-side-wrapper">
        <div className="right-side">
          <Card className="activity-info">
            <Typography variant="h6" className="title">
              Activities
            </Typography>

            <Typography className="text">
              <span> Account Created: </span> <span> {props.user.createdAt}</span>
            </Typography>
         
                  </Card>
              </div>
      </div>
    </div>
  )
}

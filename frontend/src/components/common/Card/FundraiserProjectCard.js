import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useNavigate } from 'react-router-dom'

export const FundraiserProjectCard = (props) => {
    const navigate = useNavigate()
  return (
    <Card className={props.pending ? "fundraiser-project-card new" : "fundraiser-project-card"}>
      <div className="left">
        <Typography>
          <span className="title">Project Title:</span>
          <span className="content">{props.title}</span>
        </Typography>
        {/* <Typography>
          <span className="title">Raised Amount:</span>
          <span className="content">
            {props.raised} ETB ({props.raisedPercent}%)
          </span>{' '}
        </Typography> */}
        <Typography>
          <span className="title">Project Status:</span>
          <span className="content">{props.status}</span>
        </Typography>
      </div>
      <div className="right">
        {/* <Typography>
          <span className="title">Days Left:</span>
          <span className="content">{props.daysLeft}</span>
        </Typography> */}
        <Typography>
          <span className="title">Amount :</span>
          <span className="content">{props.amount}</span>{' '}
        </Typography>
        <Typography>
          <span className="title">{props.request} request:</span>
          <span className="content">{props.approval}</span>
        </Typography>
      </div>
      <div className="actions">
        <Button className="view" onClick={()=> navigate(props.view)}>
          <VisibilityOutlinedIcon />
        </Button>
        <Button className="edit" onClick={()=> navigate(props.edit)}>
          <ModeEditOutlineOutlinedIcon />
        </Button>
      </div>
    </Card>
  )
}

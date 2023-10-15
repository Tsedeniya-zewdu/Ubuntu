import React from 'react'
import './NewsComp.scss'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export const NewsCard = (props) => {
  const navigate = useNavigate()
  return (
    <Card sx={{mb: "40px"}} className="news-card" onClick={() => navigate(`/news/${props.path}`)}>
      <CardMedia className="news-card-img" image={props.img} />
      <CardContent className="news-card-content">
        <Box
          sx={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            pb: '20px',
          }}
        >
          {/* Project's owner */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              img: {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                mr: '10px',
              },
            }}
          >
            <img
              src={`http://localhost:5000/api/uploads/${props.avator}`}
              alt="avator"
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: '14px',
                color: '#696969',
                // height: '45px',
                fontWeight: '500',
                overflow: 'hidden',
              }}
              gutterBottom
            >
              Fundraiser: {props.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AccessTimeIcon
              sx={{
                width: '20px',
                height: '20px',
                color: '#029a5b',
                mr: '7px',
              }}
            />
            <Typography
              sx={{
                color: '#696969',
                fontSize: '14px',
                fontWeight: '400',
                height: '18px',
                overflow: 'hidden',
                span: {
                  ml: '3px',
                },
              }}
            >
              Released: {props.released}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" className="news-card-title">
          {props.title}
        </Typography>
        <Typography className="news-card-text">
          {props.text}{' '}
          <Button className="btn">
            Read more{' '}
            <ArrowForwardIosIcon
              sx={{ ml: '10px', width: '12px', height: '12px', color: '#029a5b' }}
            />
          </Button>
        </Typography>
      </CardContent>
      {/* <CardActions className='news-card-btn'></CardActions> */}
    </Card>
  )
}

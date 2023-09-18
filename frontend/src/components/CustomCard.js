import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { StyledText1 } from './Common'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'

export const CustomCard = (props) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ maxWidth: { xs: 'none', sm: 380 }, maxHeight: 567 }} onClick={()=>navigate(`/projects/${props.path}`)}>
      <CardActionArea>
        {/* Card Image */}
        <CardMedia
          component="img"
          height="237"
          image={`http://localhost:5000/api/uploads/${props.img}`}
          alt="projects"
        />
        {/* Card Content wrapper */}
        <CardContent
          sx={{
            p: '35px 25px',
          }}
        >
          {/* Project Catagory */}
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#029a5b',
            }}
          >
            {props.catagory}
          </Typography>
          {/* Project Title */}
          <Typography
            gutterBottom
            variant="h4"
            sx={{
              fontSize: { xs: '16px', lg: '18px' },
              fontWeight: '700',
              color: '#1f2230',
              mb: '15px',
              minHeight: "40px"
            }}
          >
            {props.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: '15px',
              img: {
                width: '25px',
                height: '25px',
                mr: '10px',
              },
            }}
          >
            {/* Project's owner */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                img: {
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  mr: '10px',
                },
              }}
            >
              <img src={`http://localhost:5000/api/uploads/${props.avatar}`} alt="avator" />
              <Typography
                variant="h5"
                sx={{
                  fontSize: '14px',
                  color: '#696969',
                  height: '18px',
                  overflow: 'hidden',
                }}
                gutterBottom
              >
                {props.name}
              </Typography>
            </Box>
            {/* Days left for project */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AccessTimeIcon
                sx={{
                  width: '14px',
                  height: '14px',
                  color: '#029a5b',
                  mr: '5px',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#696969',
                  fontSize: '13px',
                  fontWeight: '500',
                  height: '18px',
                  overflow: 'hidden',
                  span: {
                    ml: '3px',
                  },
                }}
              >
                {props.days}
                <span>Days Left</span>
              </Typography>
            </Box>
          </Box>
          {/* Project Description */}
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              color: '#999ca5',
              mb: '15px',
              height: '40px',
              overflow: 'hidden',
            }}
          >
            {props.desc}
          </Typography>
          {/* Raised amount */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#696969',
                  span: {
                    color: '#029a5b',
                    ml: '3px',
                    fontWeight: '700',
                  },
                }}
              >
                Raised<span>{props.raised} ETB</span>
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#696969',
                fontWeight: '500',
              }}
            >
              {props.percent}%
            </Typography>
          </Box>
          {/* Progress Bar */}
          <Box
            sx={{
              height: '9px',
              width: '100%',
              borderRadius: '20px',
              backgroundColor: '#e9ece7',
              my: '10px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                height: '9px',
                width: props.percent + '%',
                borderRadius: '20px',
                backgroundColor: '#029a5b',
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            ></Box>
          </Box>
          {/* Goal */}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#1f2230',
                  fontWeight: '700',
                  height: '21px',
                  overflow: 'hidden',
                  span: {
                    color: '#029a5b',
                    ml: '3px',
                    fontWeight: '700',
                  },
                }}
              >
                Goal<span>{props.goal} ETB</span>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <StyledText1
                sx={{
                  color: "#029a5b"
                }}
              >
                Explore
              </StyledText1>
              <ArrowForwardIosIcon sx={{ width: '12px', height: '12px', color: "#029a5b" }} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

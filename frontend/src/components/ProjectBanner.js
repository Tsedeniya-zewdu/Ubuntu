import React, { useState, useEffect } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export const ProjectBanner = (props) => {
  // console.log(props.project)

  const [video, setVideo] = useState(false)
  const [progress, setProgress] = useState()
  const [daysLeft, setDaysLeft] = useState()
  // change banner image and text after some time interval
  // console.log(props.project.title)
  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(
        activeIdx === props.project.images.length - 1 ? 0 : activeIdx + 1,
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [activeIdx, props.project.images.length])

  useEffect(() => {
    let percent = parseFloat(
      (props.project.raised / props.project.amount) * 100,
    ).toFixed(2)
    setProgress(percent)
    let dateNow = new Date()
    let dateObj = new Date(props.project.deadline)
    setDaysLeft(
      Math.floor(
        (Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24),
      ),
    )
  }, [props.project])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: '16px',
        pt: { xs: '20px', sm: '40px', md: '60px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          display: 'flex',
          gap: { xs: '0px', sm: '00px', md: '40px', lg: '50px' },
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '50%' },
            maxWidth: '570px',
          }}
        >
          {/* Image Slider and Bullets wrapper */}
          {!video && (
            <Box>
              {/* Image Slider  */}
              <Box
                sx={{
                  overflow: 'hidden',
                  minHeight: { xs: 'auto', sm: '425px' },
                  img: {
                    objectFit: 'cover',
                    objectPosition: 'center',
                    // width: '570px',
                    width: '100%',
                    // height: "auto",

                    height: { xs: '236px', sm: '425px' },
                  },
                }}
              >
                {props.project.images.map((data, idx) => {
                  return (
                    <img
                      key={data}
                      className={
                        activeIdx === idx
                          ? 'slider-img show'
                          : 'slider-img hide'
                      }
                      src={`http://localhost:5000/api/uploads/${data}`}
                      alt=""
                    />
                  )
                })}
              </Box>
              {/* Image Slider Bullets */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  py: '20px',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {props.project.images.map((data, idx) => {
                    return (
                      <Box
                        sx={{
                          width: '9px',
                          height: '9px',
                          m: '4px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={
                          activeIdx === idx ? 'bullet bullet-active' : 'bullet'
                        }
                      ></Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          )}
          {/* Video */}
          {video && (
            <Box
              sx={{
                position: 'relative',
                // maxWidth: '570px',
                // minHeight: '425px',
                width: '100%',
                height: '100%',
                '>iframe': {
                  width: '100%',
                  height: { xs: '236px', sm: '425px' },
                },
              }}
            >
              <iframe
                id="iframe"
                src={`http://localhost:5000/api/uploads/${props.project.video}`}
                title="Anjia Architecture Mozambique Introduction."
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </Box>
          )}
          {/* Photo Button */}
          <Button
            onClick={() => {
              setVideo(false)
            }}
            sx={{
              position: 'absolute',
              zIndex: '22',
              top: '0px',
              right: '0px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '35px',
                height: '35px',
                borderRadius: '5px',
              }}
            >
              <CameraAltOutlinedIcon sx={{ color: '#222' }} />
            </Box>
          </Button>
          {/* Video Button */}
          <Button
            onClick={() => {
              setVideo(true)
            }}
            sx={{
              position: 'absolute',
              zIndex: '22',
              top: '45px',
              right: '0px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '35px',
                height: '35px',
                borderRadius: '5px',
              }}
            >
              <VideocamOutlinedIcon sx={{ color: '#222' }} />
            </Box>
          </Button>
        </Box>
        {/* Right Side */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
            width: { xs: '100%', md: '50%' },
            maxWidth: '570px',
          }}
        >
          <Box sx={{width: '100%'}}>
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
              {props.project.category}
            </Typography>
            {/* Project Title */}
            <Typography
              gutterBottom
              variant="h4"
              sx={{
                fontSize: { xs: '24px', md: '30px' },
                fontWeight: '700',
                color: '#1f2230',
                mb: '15px',
              }}
            >
              {props.project.title}
            </Typography>
            {/* Project's owner */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                img: {
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  mr: '10px',
                },
              }}
            >
              <img
                src={`http://localhost:5000/api/uploads/${props.project.details[0].image}`}
                alt="avator"
              />
              <Typography
                variant="h5"
                sx={{
                  fontSize: '14px',
                  color: '#696969',
                  // height: '45px',
                  overflow: 'hidden',
                }}
                gutterBottom
              >
                {props.project.details[0].name}
              </Typography>
            </Box>
            {/* Project Description */}
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                color: '#999ca5',
                my: '15px',
                height: '40px',
                overflow: 'hidden',
              }}
            >
              {props.project.desc}
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
                  Raised<span>{props.project.raised} ETB</span>
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#696969',
                  fontWeight: '500',
                }}
              >
                {progress}%
              </Typography>
            </Box>
            {/* Progress Bar */}
            <Box
              sx={{
                height: '9px',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: '#e9ece7',
                my: '10px',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  height: '9px',
                  width: `${progress}%`,
                  borderRadius: '20px',
                  backgroundColor: '#029a5b',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}
              ></Box>
            </Box>
            {/* Goal */}
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                    Goal<span>{props.project.amount} Birr</span>
                  </Typography>
                </Box>
              </Box>
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
                  sx={{
                    color: '#696969',
                    fontSize: '14px',
                    fontWeight: '500',
                    height: '18px',
                    overflow: 'hidden',
                    span: {
                      ml: '3px',
                    },
                  }}
                >
                  {daysLeft}
                  <span>Days Left</span>
                </Typography>
              </Box>
            </Box>
            {/* Social media and CTA */}
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'left', sm: 'center' },
                justifyContent: { xs: 'left', sm: 'space-between' },
                flexDirection: { xs: 'column', sm: 'row' },
                pt: '15px',
                gap: '20px',
              }}
            >
              {/* Social Media */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="#1f2230">
                  Share:{' '}
                </Typography>
                <IconButton>
                  <FacebookOutlinedIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="primary">
                  <ShareIcon />
                </IconButton>
              </Box> */}
              {/* CTA */}

              <Button
                variant="contained"
                onClick={props.handleClickScroll}
                sx={{
                  py: '10px',
                  px: '30px',
                  borderRadius: '50px',
                  textTransform: 'capitalize',
                  maxWidth: '160px',
                  mt: '20px',
                  alignSelf: { xs: 'center' },
                }}
              >
                Make Donation
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

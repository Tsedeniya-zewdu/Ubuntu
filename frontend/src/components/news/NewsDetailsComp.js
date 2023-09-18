import './NewsComp.scss'
import React, { useState, useEffect } from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import axios from 'axios'
import parse from 'html-react-parser'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useParams } from 'react-router-dom'

export const NewsDetailsComp = (props) => {
    const [video, setVideo] = useState(false)
    const [daysLeft, setDaysLeft] = useState()
    const [progress, setProgress] = useState()
    const {nid} = useParams()
  console.log(props.project)
  // change banner image and text after some time interval

  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    if (props.project.images) {
      const interval = setInterval(() => {
        setActiveIdx(
          activeIdx === props.project.images.length - 1 ? 0 : activeIdx + 1,
        )
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [activeIdx])

  const [donators, setDonators] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/donations/project/${props.project._id}`)
      try {
        setDonators(res.data)
        console.log(donators)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    setProgress(
      parseFloat((props.project.raised / props.project.amount) * 100).toFixed(
        2,
      ),
    )
    let dateNow = new Date()
    let dateObj = new Date(props.project.deadline)
    setDaysLeft(
      Math.floor(
        (Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24),
      ),
    )
  }, [])

  return (
    <>
      <div className='container-wrapper'>
          <div className='container'>
              <Box className="project-details-wrapper">
                {/* Left Side */}
                <Box className="project-details-left">
                  {/* Image Slider and Bullets wrapper */}
                  {!video && props.project.images && (
                    <Box>
                      {/* Image Slider  */}
                      <Box className="image-slider">
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
                      <Box className="image-slider-bullets-wrapper">
                        <Box className="image-slider-bullets">
                          {props.project.images.map((data, idx) => {
                            return (
                              <Box
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={
                                  activeIdx === idx
                                    ? 'bullets bullet bullet-active'
                                    : 'bullets bullet'
                                }
                              ></Box>
                            )
                          })}
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {/* Video */}
                  {video && props.project.video && (
                    <Box className="video-wrapper">
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
                    className="photo-btn"
                  >
                    <Box className="icon-wrapper">
                      <CameraAltOutlinedIcon sx={{ color: '#222' }} />
                    </Box>
                  </Button>
                  {/* Video Button */}
                  <Button
                    onClick={() => {
                      setVideo(true)
                    }}
                    className="video-btn"
                  >
                    <Box className="icon-wrapper">
                      <VideocamOutlinedIcon sx={{ color: '#222' }} />
                    </Box>
                  </Button>
                </Box>
                {/* Right Side */}
                <Box className="right-side">
                  <Box sx={{ width: '100%' }}>
                    {/* Project Catagory */}
                    <Typography variant="h6">
                      <span className="category-title">Category: </span>
                      <span className="category-text">{props.project.category}</span>
                    </Typography>
                    {/* Project Title */}
                    <Typography variant="h4">
                      <span className="project-title">Title: </span>{' '}
                      <span className="project-title-text">{props.project.title}</span>
                    </Typography>
                    {/* Project Description */}
                    <Typography className="desc-title">Short Description</Typography>
                    <Typography variant="body2" className="desc-text">
                      {props.project.desc}
                    </Typography>
                    {/* Raised amount */}
                    <Box className="raised-goal-wrapper">
                      <Box>
                        <Typography>
                          <span className="raised-title">Raised: </span>
                          <span className="raised-text">
                            {props.project.raised} ETB
                          </span>
                        </Typography>
                      </Box>
                      <Typography className="raised-percent-text">
                        {progress}%
                      </Typography>
                    </Box>
                    {/* Progress Bar */}
                    <Box className="progress-bar">
                      <Box
                        className="progress-inner-bar"
                        sx={{
                          width: `${progress}%`,
                        }}
                      ></Box>
                    </Box>
                    {/* Goal */}
                    <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                      <Box className="goal-wrapper">
                        <Box>
                          <Typography>
                            <span className="goal-title">Goal: </span>
                            <span className="goal-text">
                              {props.project.amount} ETB
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                  </Box>
                </Box>
              </Box>
              {/* Story */}
              <Box className="story-wrapper" sx={{ alignItems: 'flex-start' }}>
                {/* Story */}
                <Box sx={{ width: '100%', maxWidth: '772px' }}>
                  {' '}
                  {/* Title */}
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
                    Story
                  </Typography>
                  {/* Project Description */}
                  <Box
                    sx={{
                      overflow: 'scroll',
                      overflowX: 'hidden',
                      my: '15px',
                    }}
                  >
                    {parse(props.project.story)}
                  </Box>
                </Box>
                {/* Recent Donations */}
                {/* Recent Donations */}
                <Box sx={{}}>
                  <List
                    sx={{
                      minWidth: { xs: '248px', sm: '400px' },
                      width: '100%',
                      maxWidth: '450px',
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      height: '400px',
                    }}
                    subheader={<li />}
                  >
                    <ListSubheader
                      sx={{
                        fontSize: '26px',
                        fontWeight: '700',
                        color: '#1f2230',
                        pb: { xs: '20px', sm: '25px', md: '30px' },
                      }}
                    >
                      Donations History
                    </ListSubheader>
                    <Divider light />
                    {donators.map((donator, idx) => {
                      let dateNow = new Date()
                      let dateObj = new Date(donator.updatedAt)
                      let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
                      let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
                      let day = dateNow.getUTCDate() - dateObj.getUTCDate()
                      let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
                      let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
                      year = year != 0 ? `${year}yr` : ''
                      month = month != 0 && month > 0 ? `${month}m` : ''
                      day = day != 0 && day > 0 ? `${day}d` : ''
                      hour = hour != 0 && hour > 0 ? `${hour}h` : ''
                      min = min != 0 && min > 0 ? `${min}min` : `0m`
                      let timeAndDate
                      if (year != '') {
                        timeAndDate = `${year} ago`
                      } else if (month != '') {
                        timeAndDate = `${month} ago`
                      } else if (day != '') {
                        timeAndDate = `${day} ago`
                      } else if (hour != '') {
                        timeAndDate = `${hour} ago`
                      } else {
                        timeAndDate = `${min} ago`
                      }
                      return (
                        <Box key={idx} sx={{ mr: '20px' }}>
                          <ListItem
                            sx={{
                              justifyContent: 'space-between',
                              gap: { xs: '20px' },
                              maxHeight: '60px',
                            }}
                          >
                            {/* Donators */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                img: {
                                  width: '45px',
                                  height: '45px',
                                  mr: '10px',
                                  borderRadius: '50%',
                                },
                              }}
                            >
                              <img
                                src={
                                  donator.anonymous
                                    ? 'http://localhost:5000/api/uploads/profile-icon.png'
                                    : (donator.user[0] ? `http://localhost:5000/api/uploads/${donator.user[0].image}` : 'http://localhost:5000/api/uploads/profile-icon.png')
                                }
                                alt="avator"
                              />
                              <Box sx={{}}>
                                {/* Name */}
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontSize: '14px',
                                    color: '#5e848c',
                                    fontWeight: '500',
                                    height: '18px',
                                    overflow: 'hidden',
                                  }}
                                  gutterBottom
                                >
                                  {donator.anonymous
                                    ? 'Anonymous'
                                    : donator.donator}
                                </Typography>
                                {/* Date */}
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontSize: '14px',
                                    color: '#696969',
                                    height: '18px',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {timeAndDate}
                                </Typography>
                              </Box>
                            </Box>
                            {/* Amount Donated */}
                            <Box>
                              <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                  fontSize: '14px',
                                  color: '#5e848c',
                                  fontWeight: '500',
                                }}
                              >
                                Donated
                              </Typography>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: '700',
                                  color: '#029a5b',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {donator.amount}{' ETB'}
          
                              </Typography>
                            </Box>
                          </ListItem>
                          <Divider light />
                        </Box>
                      )
                    })}
                  </List>
                </Box>
              </Box>
          </div>
      </div>
    </>
  )
}


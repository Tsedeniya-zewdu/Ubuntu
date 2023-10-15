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
import { Data } from './Data'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import NewsTable from './NewsTable'
import moment from 'moment';
import { useTranslation } from 'react-i18next'

export const NewsDetailsComp = (props) => {
  const {t} = useTranslation()
  let graphData = []
  let tmp

    for (let i = 0; i < props.project.donations.length; i++) {
      for (let j = 0; j < props.project.donations[i].months.length; j++) {
        tmp = {
          amount: props.project.donations[i].months[j].mAmount,
          date: props.project.donations[i].months[j].month + '/' + props.project.donations[i].year
        }
        graphData.push(tmp)
      }
  }

  for (let i = 1; i < graphData.length; i++) {
    graphData[i].amount += graphData[i-1].amount
  }
  console.log(graphData)
  const [chartData, setChartData] = useState({
      labels: graphData.map((item) => item.date
    ),
    datasets: [
      {
        label: 'Donation amount',
        data: graphData.map((item) => item.amount),
      },
    ],
  })
  const [video, setVideo] = useState(false)
  const [daysLeft, setDaysLeft] = useState()
  const [progress, setProgress] = useState()
  const { nid } = useParams()
  // console.log(props.project)
  // change banner image and text after some time interval

  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    if (props.project.newsimages) {
      const interval = setInterval(() => {
        setActiveIdx(
          activeIdx === props.project.newsimages.length - 1 ? 0 : activeIdx + 1,
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
        // console.log(donators)
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

  let dateNow = new Date()
  let dateObj = new Date(props.project.released)
  let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
  let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
  let day = dateNow.getUTCDate() - dateObj.getUTCDate()
  let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
  let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
  year = year != 0 ? `${year}${t('project:story.3')}` : ''
  month = month != 0 && month > 0 ? `${month}${t('project:story.4')}` : ''
  day = day != 0 && day > 0 ? `${day}${t('project:story.5')}` : ''
  hour = hour != 0 && hour > 0 ? `${hour}${t('project:story.6')}` : ''
  min =
    min != 0 && min > 0
      ? `${min}${t('project:story.7')}`
      : `0${t('project:story.7')}`
  let timeAndDate
  if (year != '') {
    timeAndDate = `${year} ${t('project:story.8')}`
  } else if (month != '') {
    timeAndDate = `${month}  ${t('project:story.8')}`
  } else if (day != '') {
    timeAndDate = `${day}  ${t('project:story.8')}`
  } else if (hour != '') {
    timeAndDate = `${hour}  ${t('project:story.8')}`
  } else {
    timeAndDate = `${min}  ${t('project:story.8')}`
  }
  return (
    <>
      <div className="container-wrapper">
        <div className="container">
          <Box className="news-details-wrapper">
            {/* News details banner */}
            <Box className="news-details-banner">
              {/* Image Slider and Bullets wrapper */}
              {!video && props.project.newsimages && (
                <Box>
                  {/* Image Slider  */}
                  <Box className="image-slider">
                    {props.project.newsimages.map((data, idx) => {
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
                      {props.project.newsimages.map((data, idx) => {
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
              {video && props.project.newsvideo && (
                <Box className="video-wrapper">
                  <iframe
                    id="iframe"
                    src={`http://localhost:5000/api/uploads/${props.project.newsvideo}`}
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
          </Box>

          {/* Story */}
          <Box className="news-story-wrapper">
            {/* top news title  */}
            <Box className="news-details-banner-title">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  height: '100%',
                  width: { xs: '100%', md: '50%' },
                  maxWidth: '570px',
                }}
              >
                <Box sx={{ width: '100%' }}>
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

                  <Box
                    sx={{
                      display: 'flex', gap: '40px',
                      // alignItems: 'center'
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
                        src={`http://localhost:5000/api/uploads/${props.project.details[0].image}`}
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
                        Fundraiser: {props.project.details[0].name}
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
                       Released: {timeAndDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Story */}
            <Box sx={{ width: '100%', maxWidth: '1000px' }}>
              {/* Project Description */}
              <Box
                className="news-desc"
                sx={{
                  overflow: 'scroll',
                  overflowX: 'hidden',
                  my: '15px',
                }}
              >
                {parse(props.project.newsdetail)}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  )
}

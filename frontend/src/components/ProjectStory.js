import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import parse from 'html-react-parser'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const ProjectStory = (props) => {
  const {t} = useTranslation()
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: '16px',
        pt: { xs: '20px', sm: '30px', md: '40px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          display: 'flex',
          gap: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
          // alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'flex-start', md: 'space-between' },
        }}
      >
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
            {t('project:story.1')}
          </Typography>
          {/* Project Description */}
          <Box
            sx={{
              overflow: 'scroll',
              overflowX: 'hidden',
              my: '15px',
              pr: '20px'
            }}
          >
            {parse(props.project.story)}
          </Box>
        </Box>
        {/* Recent Donations */}
        <Box>
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
              {t('project:story.2')}
            </ListSubheader>
            <Divider light />
            {props.donators &&
              props.donators.map((donator, idx) => {
                let dateNow = new Date()
                let dateObj = new Date(donator.updatedAt)
                let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
                let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
                let day = dateNow.getUTCDate() - dateObj.getUTCDate()
                let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
                let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
                year = year != 0 ? `${year}${t('project:story.3')}` : ''
                month = month != 0 && month > 0 ? `${month}${t('project:story.4')}` : ''
                day = day != 0 && day > 0 ? `${day}${t('project:story.5')}` : ''
                hour = hour != 0 && hour > 0 ? `${hour}${t('project:story.6')}` : ''
                min = min != 0 && min > 0 ? `${min}${t('project:story.7')}` : `0${t('project:story.7')}`
                let timeAndDate
                if (year != '') {
                  timeAndDate = `${year} ${t('project:story.8')}`
                } else if (month != '') {
                  timeAndDate = `${month}  ${t('project:story.8')}`
                } else if (day != '') {
                  timeAndDate = `${day}  ${t('project:story.8')}`
                }else if (hour != '') {
                  timeAndDate = `${hour}  ${t('project:story.8')}`
                } else {
                  timeAndDate = `${min}  ${t('project:story.8')}`
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
                              ? t('project:story.9')
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
                         {t('project:story.10')}
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
                          {donator.amount}{t('project:story.11')}
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
    </Box>
  )
}

import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import parse from 'html-react-parser'
import axios from 'axios'

export const ProjectStory = (props) => {
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
              Recent Donations
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
                }else if (hour != '') {
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
    </Box>
  )
}

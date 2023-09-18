import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { AdminNotificationCard } from '../../components/common/Card/AdminNotificationCard'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export const AdminNotifications = () => {
  
  const { getAdminNotifications } = useContext(AuthContext)
  
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [projectsHistory, setProjectHistory] = useState([])

  useEffect(() => {
    getAdminNotifications().then((res) => {
      setProjects(res)
    })
    const fetchData = async () => {
      let res = await axios.get('/notifications/admin/history')
      try {
        setProjectHistory(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Box
          sx={{ display: 'flex', flexDirection: 'column-reverse', gap: '20px' }}
        >
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            Latest Notifications
          </Typography>
          <Button
            onClick={() => navigate('/admin')}
            variant="contained"
            sx={{
              background: 'gray',
              mb: '20px',
              maxWidth: '100px',
              textTransform: 'none',
              '&:hover': { background: 'gray' },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Box>
        {/* New Notification */}
        <Box>
          {projects &&
            projects.map((data, idx) => {
              let dateNow = new Date()
              let dateObj = new Date(data.updatedAt)
              let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
              let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
              let day =  dateNow.getUTCDate() - dateObj.getUTCDate()
              let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
              let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
              year = year != 0 ? `${year}yr` : ''
              month = (month != 0 && month > 0) ? `${month}m` : ''
              day = (day != 0 && day > 0)? `${day}d` : ''
              hour = (hour != 0 && hour > 0) ? `${hour}h` : ''
              min = (min != 0 && min > 0) ? `${min}min` : `0m`
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
              console.log(dateNow, dateObj, timeAndDate)
              return (
                <AdminNotificationCard
                  key={idx}
                  id={data._id}
                  img={data.details != [] ? data.details[0].image : 'profile-icon.png'}
                  name={data ? data.details[0].name : ''}
                  title={data.title}
                  time={timeAndDate}
                  type={data.request}
                  status={data.status}
                  approval={data.approval}
                  new={true}
                />
              )
            })}
        </Box>
        {/* Notification history */}
        <Box>
          {projectsHistory &&
            projectsHistory.map((data, idx) => {
              let dateNow = new Date()
              let dateObj = new Date(data.updatedAt)
              let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
              let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
              let day =  dateNow.getUTCDate() - dateObj.getUTCDate()
              let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
              let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
              year = year != 0 ? `${year}yr` : ''
              month = (month != 0 && month > 0) ? `${month}m` : ''
              day = (day != 0 && day > 0)? `${day}d` : ''
              hour = (hour != 0 && hour > 0) ? `${hour}h` : ''
              min = (min != 0 && min > 0) ? `${min}min` : `0m`
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
              console.log(dateNow, dateObj, timeAndDate)
              return (
                <AdminNotificationCard
                  key={idx}
                  id={data._id}
                  img={data.details != [] ? data.details[0].image : 'profile-icon.png'}
                  name={data ? data.details[0].name : ''}
                  title={data.title}
                  time={timeAndDate}
                  type={data.request}
                  status={data.status}
                  approval={data.approval}
                />
              )
            })}
        </Box>
      </div>
    </Box>
  )
}

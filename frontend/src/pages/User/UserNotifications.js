import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { UserNotificationCard } from '../../components/common/Card/UserNotificationCard'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'

// const cardData = [
//   {
//     id: '64d34fb8c89df6cb8e308036',
//     img: '/images/avator.png',
//     name: 'Yohannes Alemu',
//     goal: 900000,
//     title: 'Funds for Empowering Minds, Building Futures',
//     raised: 5000,
//     percent: 15,
//     time: '10 min ago',
//     days: 345,
//     },
//     {
//         id: '64d34fb8c89df6cb8e308036',
//         img: '/images/avator.png',
//         name: 'Yohannes Alemu',
//         goal: 900000,
//         title: 'Funds for Empowering Minds, Building Futures',
//         raised: 5000,
//         percent: 15,
//         time: '10 min ago',
//         days: 345,
//     },
//     {
//         id: '64d34fb8c89df6cb8e308036',
//         img: '/images/avator.png',
//         name: 'Yohannes Alemu',
//         goal: 900000,
//         title: 'Funds for Empowering Minds, Building Futures',
//         raised: 5000,
//         percent: 15,
//         time: '10 min ago',
//         days: 345,
//     },
//     {
//         id: '64d34fb8c89df6cb8e308036',
//         img: '/images/avator.png',
//         name: 'Yohannes Alemu',
//         goal: 900000,
//         title: 'Funds for Empowering Minds, Building Futures',
//         raised: 5000,
//         percent: 15,
//         time: '10 min ago',
//         days: 345,
//       },
// ]

export const UserNotifications = () => {
  const navigate = useNavigate()
  const { currentUser, getUserNotifications } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [projectsHistory, setProjectHistory] = useState([])
  useEffect(() => {
    getUserNotifications().then((res) => {
      setProjects(res)
    })
    const fetchData = async () => {
      let res = await axios.post("/notifications/user/history", currentUser)
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
            onClick={() => navigate('/user')}
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
        {/* New projects notifications */}
        <Box>
          {projects && projects.map((data, idx) => {
            let progress = parseFloat(
              (data.raised / data.amount) * 100,
            ).toFixed(2)
            let dateNow = new Date()
      let dateObj = new Date(data.deadline)
      let daysLeft = Math.floor((Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24))

       dateNow = new Date()
      dateObj = new Date(data.updatedAt)
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
            return (
              <UserNotificationCard
                key={idx}
                id={data._id}
                img={data.details[0].image}
                name={data.details[0].name}
                goal={data.amount}
                title={data.title}
                raised={data.raised}
                percent={progress}
                time={timeAndDate}
                days={daysLeft}
                new={true}
              />
            )
          })}
        </Box>
{/* projects notifications history */}
        <Box>
          {projectsHistory && projectsHistory.map((data, idx) => {
            let progress = parseFloat(
              (data.raised / data.amount) * 100,
            ).toFixed(2)
            let dateNow = new Date()
      let dateObj = new Date(data.deadline)
      let daysLeft = Math.floor((Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24))

       dateNow = new Date()
      dateObj = new Date(data.updatedAt)
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
            return (
              <UserNotificationCard
                key={idx}
                id={data._id}
                img={data.details[0].image}
                name={data.details[0].name}
                goal={data.amount}
                title={data.title}
                raised={data.raised}
                percent={progress}
                time={timeAndDate}
                days={daysLeft}
              />
            )
          })}
        </Box>
      </div>
    </Box>
  )
}

import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { FundraiserNotificationCard } from '../../components/common/Card/FundraiserNotificationCard'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const FundraiserNotifications = () => {
  const navigate = useNavigate()

  const { currentUser, getFundraiserNotifications } = useContext(AuthContext)
  const [donations, setDonations] = useState([])
  const [donationsHistory, setDonationHistory] = useState([])
  useEffect(() => {
    getFundraiserNotifications().then((res) => {
      setDonations(res)
    })
    const fetchData = async () => {
      let res = await axios.post(
        '/notifications/fundraiser/history',
        currentUser,
      )
      try {
        setDonationHistory(res.data)
        console.log(res.data)
        console.log(currentUser)
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
            onClick={() => navigate('/fundraiser')}
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
        {/* new donations notifications */}
        <Box>
          {donations &&
            donations.map((data, idx) => {
              let dateNow = new Date()
              let dateObj = new Date(data.updatedAt)
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
                <FundraiserNotificationCard
                  key={idx}
                  id={data.projectId}
                  img={data.anonymous ? 'profile-icon.png' : (data.user[0] ? data.user[0].image: 'profile-icon.png')}
                  name={data.anonymous ? 'Anonymous' : data.donator}
                  donated={data.amount}
                  title={data.project[0].title}
                  raised={data.project[0].raised}
                  time={timeAndDate}
                  goal={data.project[0].amount}
                  new={false}
                />
              )
            })}
        </Box>

        {/* donations notifications history */}
        <Box>
          {donationsHistory &&
            donationsHistory.map((data, idx) => {
              let dateNow = new Date()
              let dateObj = new Date(data.updatedAt)
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
                <FundraiserNotificationCard
                  key={idx}
                  id={data.projectId}
                  img={data.anonymous ? 'profile-icon.png' : (data.user[0] ? data.user[0].image: 'profile-icon.png')}
                  name={data.anonymous ? 'Anonymous' : data.donator}
                  donated={data.amount}
                  title={data.project[0].title}
                  raised={data.project[0].raised}
                  time={timeAndDate}
                  goal={data.project[0].amount}
                />
              )
            })}
        </Box>
      </div>
    </Box>
  )
}

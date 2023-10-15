import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { FundraiserNotificationCard } from '../../components/common/Card/FundraiserNotificationCard'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const FundraiserNotifications = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()

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
            {t('title.1')}
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
            {t('btn.1')}
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
              year = year != 0 ? `${year}${t('time.1')}` : ''
              month = month != 0 && month > 0 ? `${month}${t('time.2')}` : ''
              day = day != 0 && day > 0 ? `${day}${t('time.3')}` : ''
              hour = hour != 0 && hour > 0 ? `${hour}${t('time.4')}` : ''
              min = min != 0 && min > 0 ? `${min}${t('time.5')}` : `0${t('time.5')}`
              let timeAndDate
              if (year != '') {
                timeAndDate = `${year} ${t('time.6')}`
              } else if (month != '') {
                timeAndDate = `${month} ${t('time.6')}`
              } else if (day != '') {
                timeAndDate = `${day} ${t('time.6')}`
              } else if (hour != '') {
                timeAndDate = `${hour} ${t('time.6')}`
              } else {
                timeAndDate = `${min} ${t('time.6')}`
              }
              return (
                <FundraiserNotificationCard
                  key={idx}
                  id={data.projectId}
                  img={data.anonymous ? 'profile-icon.png' : (data.user[0] ? data.user[0].image : 'profile-icon.png')}
                  name={data.anonymous ? t('time.7') : data.donator}
                  donated={data.amount}
                  title={data.project[0] ? data.project[0].title : ''}
                  raised={data.project[0] ? data.project[0].raised : ''}
                  time={timeAndDate}
                  goal={data.project[0] ? data.project[0].amount : ''}
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
              year = year != 0 ? `${year}${t('time.1')}` : ''
              month = month != 0 && month > 0 ? `${month}${t('time.2')}` : ''
              day = day != 0 && day > 0 ? `${day}${t('time.3')}` : ''
              hour = hour != 0 && hour > 0 ? `${hour}${t('time.4')}` : ''
              min = min != 0 && min > 0 ? `${min}${t('time.5')}` : `0${t('time.5')}`
              let timeAndDate
              if (year != '') {
                timeAndDate = `${year} ${t('time.6')}`
              } else if (month != '') {
                timeAndDate = `${month} ${t('time.6')}`
              } else if (day != '') {
                timeAndDate = `${day} ${t('time.6')}`
              } else if (hour != '') {
                timeAndDate = `${hour} ${t('time.6')}`
              } else {
                timeAndDate = `${min} ${t('time.6')}`
              }
              return (
                <FundraiserNotificationCard
                  key={idx}
                  id={data.projectId}
                  img={data.anonymous ? 'profile-icon.png' : (data.user[0] ? data.user[0].image: 'profile-icon.png')}
                  name={data.anonymous ? t('time.7') : data.donator}
                  donated={data.amount}
                  title={data.project[0] ? data.project[0].title : ''}
                  raised={data.project[0] ? data.project[0].raised : ''}
                  time={timeAndDate}
                  goal={data.project[0] ? data.project[0].amount : ''}
                />
              )
            })}
        </Box>
      </div>
    </Box>
  )
}

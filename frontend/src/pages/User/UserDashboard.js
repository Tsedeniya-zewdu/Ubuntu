import React, { useContext, useEffect, useState } from 'react'
import { DashboardCard } from '../../components/common/Card/DashboardCard'
import { Box, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { ReportsCompUser } from '../../components/reports/ReportsCompUser'

export const UserDashboard = () => {

  const {t} = useTranslation()

  const { currentUser, userNotifications, getUserNotifications } = useContext(AuthContext)
  let profileImage = (currentUser.image != '') ? `http://localhost:5000/api/uploads/${currentUser.image}`: '/images/profile-icon.png'

  const [donations, setDonations] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/donations/user/${currentUser._id}`)
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setDonations(sum)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    getUserNotifications()
  }, [])

  const cardData = [
    {
      text1: t('dashboard.1.1'),
      text2: t('dashboard.1.2'),
      img: profileImage,
      text3: currentUser.name,
      text4: t('dashboard.1.3'),
      btn: t('dashboard.1.6'),
      path: '/user-profile',
    },
    {
      text1: t('dashboard.2.1'),
      text2: t('dashboard.2.2'),
      img: '/images/message-icon.png',
      text3: '',
      text4: t('dashboard.2.3'),
      btn: t('dashboard.2.4'),
      path: '/user-messages',
    },
    {
      text1: t('dashboard.3.1'),
      text2: t('dashboard.3.2'),
      img: '/images/notification-icon.png',
      text3: userNotifications,
      text4: t('dashboard.3.3'),
      btn: t('dashboard.3.4'),
      path: '/user-notifications',
    },
  ]
  const cardData2 = [
    {
      text1: t('dashboard.4.1'),
      text2: t('dashboard.4.2'),
      img: '/images/donation-icon.png',
      text3: donations,
      text4: t('dashboard.4.3'),
      btn: t('dashboard.4.4'),
      path: '/user-donations',
    },
  ]
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Typography variant="h5" sx={{ fontWeight: '700', pb: '0px' }}>
          {t('dashboard.title.1')}
        </Typography>
        <ReportsCompUser />
      </div>
    </Box>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { DashboardCard } from '../../components/common/Card/DashboardCard'
import { Box, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const UserDashboard = () => {
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
      text1: 'Welcome back!',
      text2: 'Ubuntu Dashboard',
      img: profileImage,
      text3: currentUser.name,
      text4: 'User',
      btn: 'View Profile',
      path: '/user-profile',
    },
    {
      text1: 'Messages',
      text2: 'List of all my messages',
      img: '/images/message-icon.png',
      text3: '',
      text4: 'Latest messages',
      btn: 'View Messages',
      path: '/user-messages',
    },
    {
      text1: 'Notifications',
      text2: 'List of all notifications',
      img: '/images/notification-icon.png',
      text3: userNotifications,
      text4: 'Latest notifications',
      btn: 'View Notifications',
      path: '/user-notifications',
    },
  ]
  const cardData2 = [
    {
      text1: 'My Donations',
      text2: 'Donation Transactions',
      img: '/images/donation-icon.png',
      text3: donations,
      text4: 'Total donations',
      btn: 'View Donations',
      path: '/user-donations',
    },
  ]
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
          User Dashboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '40px',
              width: '100%',
              pb: '50px',
            }}
          >
            {cardData.map((data, idx) => {
              return (
                <DashboardCard
                  key={idx}
                  id={idx}
                  text1={data.text1}
                  text2={data.text2}
                  img={data.img}
                  text3={data.text3}
                  text4={data.text4}
                  btn={data.btn}
                  path={data.path}
                />
              )
            })}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '40px',
              width: '100%',
              pb: '50px',
            }}
          >
            {cardData2.map((data, idx) => {
              return (
                <DashboardCard
                  key={idx}
                  text1={data.text1}
                  text2={data.text2}
                  img={data.img}
                  text3={data.text3}
                  text4={data.text4}
                  btn={data.btn}
                  path={data.path}
                />
              )
            })}
          </Box>
        </Box>
      </div>
    </Box>
  )
}

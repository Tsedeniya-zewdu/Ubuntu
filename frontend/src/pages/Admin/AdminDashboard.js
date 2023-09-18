import React, { useContext, useEffect, useState } from 'react'
import { DashboardCard } from '../../components/common/Card/DashboardCard'
import { Box, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext)
  let profileImage = (currentUser.image != '') ? `http://localhost:5000/api/uploads/${currentUser.image}` : '/images/profile-icon.png'
  
  const [notifications, setNotifications] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('/projects/pending')
      try {
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setNotifications(sum)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const [donations, setDonations] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/donations')
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
  }, [])

  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects")
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setProjects(sum)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])

  const [fundraisers, setFundraisers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/fundraiser')
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setFundraisers(sum)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])


  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/users')
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setUsers(sum)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const cardData = [
    {
      text1: 'Welcome back!',
      text2: 'Ubuntu Dashboard',
      img: profileImage,
      text3: currentUser.name,
      text4: 'Admin',
      btn: 'View Profile',
      path: '/admin-profile',
    },
    {
      text1: 'Messages',
      text2: 'List of all my messages',
      img: '/images/message-icon.png',
      text3: '',
      text4: 'Latest messages',
      btn: 'View Messages',
      path: '/admin-messages',
    },
    {
      text1: 'Notifications',
      text2: 'List of all notifications',
      img: '/images/notification-icon.png',
      text3: notifications,
      text4: 'Latest notifications',
      btn: 'View Notifications',
      path: '/admin-notifications'
    },
  ]
  const cardData2 = [
    {
      text1: 'Donations',
      text2: 'Donation Transactions',
      img: '/images/donation-icon.png',
      text3: donations,
      text4: 'Total donations',
      btn: 'View Donations',
      path: '/admin-donations',
    },
    {
      text1: 'Projects',
      text2: 'List of all projects',
      img: '/images/project-icon.png',
      text3: projects,
      text4: 'Approved projects',
      btn: 'View Projects',
      path: '/admin-projects',
    },
    {
      text1: 'Fundraisers',
      text2: 'Latest Fundraisers',
      img: '/images/user-icon.png',
      text3: fundraisers,
      text4: 'All Fundraisers',
      btn: 'View Fundraisers',
      path: '/admin-fundraisers',
    },
  ]
  const cardData3 = [
    {
      text1: 'Users',
      text2: 'Latest Users',
      img: '/images/user-icon.png',
      text3: users,
      text4: 'All Users',
      btn: 'View Users',
      path: '/admin-users',
    },
    // {
    //   text1: 'Reports',
    //   text2: 'Different reports',
    //   img: '/images/project-icon.png',
    //   text3: 'Generate',
    //   text4: 'Generate Reports',
    //   btn: 'View Reports',
    //   path: '/admin-reports',
    // },
  
  ]
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
          Admin Dashboard
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
          <Box
            sx={{
              display: 'flex',
              gap: '40px',
              width: '100%',
              pb: '50px',
            }}
          >
            {cardData3.map((data, idx) => {
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

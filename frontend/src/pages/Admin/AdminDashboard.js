import React, { useContext, useEffect, useState } from 'react'
import { DashboardCard } from '../../components/common/Card/DashboardCard'
import { Box, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { ReportsComp } from '../../components/reports/ReportsComp'

export const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext)
  let profileImage = (currentUser.image != '') ? `http://localhost:5000/api/uploads/${currentUser.image}` : '/images/profile-icon.png'
  
  const [notifications, setNotifications] = useState(0)

  const { t } = useTranslation()
  let customPath = ''
  if (currentUser.type == 'super') {
    customPath = '2'
  } else {
    customPath = '1'
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`/projects/pending${customPath}`)
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
      text1:  t('dashboard.1.1'),
      text2: t('dashboard.1.2'),
      img: profileImage,
      text3: currentUser.name,
      text4: currentUser.type +  ' ' + t('dashboard.1.5'),
      btn: t('dashboard.1.6'),
      path: '/admin-profile',
    },
    {
      text1: t('dashboard.2.1'),
      text2: t('dashboard.2.2'),
      img: '/images/message-icon.png',
      text3: '',
      text4: t('dashboard.2.3'),
      btn: t('dashboard.2.4'),
      path: '/admin-messages',
    },
    {
      text1: t('dashboard.3.1'),
      text2: t('dashboard.3.2'),
      img: '/images/notification-icon.png',
      text3: notifications,
      text4: t('dashboard.3.3'),
      btn: t('dashboard.3.4'),
      path: '/admin-notifications'
    },
  ]
  const cardData2 = [
    {
      text1: t('dashboard.9.1'),
      text2: t('dashboard.9.2'),
      img: '/images/donation-icon.png',
      text3: donations,
      text4: t('dashboard.9.3'),
      btn: t('dashboard.9.4'),
      path: '/admin-donations',
    },
    {
      text1: t('dashboard.6.1'),
      text2: t('dashboard.6.2'),
      img: '/images/project-icon.png',
      text3: projects,
      text4: t('dashboard.6.3'),
      btn: t('dashboard.6.4'),
      path: '/admin-projects',
    },
    {
      text1:  t('dashboard.7.1'),
      text2: t('dashboard.7.2'),
      img: '/images/user-icon.png',
      text3: fundraisers,
      text4: t('dashboard.7.3'),
      btn: t('dashboard.7.4'),
      path: '/admin-fundraisers',
    },
  ]
  const cardData3 = [
    {
      text1:  t('dashboard.8.1'),
      text2:  t('dashboard.8.2'),
      img: '/images/user-icon.png',
      text3: users,
      text4:  t('dashboard.8.3'),
      btn: t('dashboard.8.4'),
      path: '/admin-users',
    },
    {
      text1: 'Reports',
      text2: 'Different reports',
      img: '/images/project-icon.png',
      text3: 'Generate',
      text4: 'Generate Reports',
      btn: 'View Reports',
      path: '/admin-reports',
    },
  
  ]
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Typography variant="h5" sx={{ fontWeight: '700', pb: '0px' }}>
        {t('dashboard.title.3')}
        </Typography>
        <ReportsComp />
        {/* <Box
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
        </Box> */}
      </div>
    </Box>
  )
}

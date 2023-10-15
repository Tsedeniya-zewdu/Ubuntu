import React, { useContext, useEffect, useState } from 'react'
import { DashboardCard } from '../../components/common/Card/DashboardCard'
import { Box, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { ReportsCompFundraiser } from '../../components/reports/ReportsCompFundraiser'

export const FundraiserDashboard = () => {
  const { currentUser, fundraiserNotifications } = useContext(AuthContext)
  let profileImage = (currentUser.image != '') ? `http://localhost:5000/api/uploads/${currentUser.image}` : '/images/profile-icon.png'
  
  const [donations, setDonations] = useState([])

  const { t } = useTranslation()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/donations/fundraiser/${currentUser._id}`)
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
  const currentFundraiser = {
    fundraiser: currentUser._id
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/fundraiser/projects", currentFundraiser)
        let sum = 0
        res.data.forEach((data) => {
          sum++
        })
        setProjects(sum)
        console.log(projects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  
  const cardData = [
    {
      text1: t('dashboard.1.1'),
      text2: t('dashboard.1.2'),
      img: profileImage,
      text3: currentUser.name,
      text4: t('dashboard.1.4'),
      btn: t('dashboard.1.6'),
      path: '/fundraiser-profile'
    },
    {
      text1: t('dashboard.2.1'),
      text2: t('dashboard.2.2'),
      img: '/images/message-icon.png',
      text3: '',
      text4: t('dashboard.2.3'),
      btn: t('dashboard.2.4'),
      path: '/fundraiser-messages'
    },
    {
      text1: t('dashboard.3.1'),
      text2: t('dashboard.3.2'),
      img: '/images/notification-icon.png',
      text3: fundraiserNotifications,
      text4: t('dashboard.3.3'),
      btn: t('dashboard.3.4'),
      path: '/fundraiser-notifications'
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
      path: '/fundraiser-donations'
    },
    {
      text1: t('dashboard.5.1'),
      text2: t('dashboard.5.2'),
      img: '/images/project-icon.png',
      text3: projects,
      text4: t('dashboard.5.3'),
      btn: t('dashboard.5.4'),
      path: '/fundraiser-projects'
    },
  ]
  return (
    <Box sx={{ minHeight: '100vh'}} className="container-wrapper">
      <div className="container">
        <Typography variant="h5" sx={{ fontWeight: '700', pb: '0px' }}>
        {t('dashboard.title.2')}
        </Typography>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
       </Box> */}
        <ReportsCompFundraiser />
      </div>
    </Box>
  )
}

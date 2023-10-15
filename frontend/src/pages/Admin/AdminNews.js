import { Box, Button, Typography } from '@mui/material'
import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { AdminNewsCard } from '../../components/common/Card/AdminNewsCard';

export const AdminNews = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const {t} = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects/completed")
        setProjects(res.data)
        console.log(projects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])
 
  return (
    <Box sx={{ minHeight: '100vh'}} className="container-wrapper">
      <div className="container">
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Box>
          <Button
            onClick={() => navigate('/fundraiser')}
              variant="contained"
              sx={{ background: 'gray', mb: '20px', maxWidth: '100px', textTransform: 'none', '&:hover':{background: 'gray'} }}
              startIcon={<ArrowBackIcon />}
          >
            {t('btn.1')}
          </Button>
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            {t('title.10')}
          </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          {projects && projects.map((data, idx) => {
              return (
                <AdminNewsCard
                  key={idx}
                  title={data.title}
                  raised={data.raised}
                  raisedPercent={data.raisedPercent}
                  goal={data.goal}
                  daysLeft={data.daysLeft}
                  amount={data.amount}
                  status={data.status}
                  approval={data.approval}
                  request={data.request}
                  news={data.news}
                  view={`/news/${data._id}`}
                  edit={`/admin-news-create/${data._id}`}
                  pending={(data.approval == 'Pending') ? true : false}
                />
              )
          })}
        </Box>

      </div>
    </Box>
  )
}

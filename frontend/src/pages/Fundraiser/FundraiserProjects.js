import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FundraiserProjectCard } from '../../components/common/Card/FundraiserProjectCard'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export const FundraiserProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const { currentUser } = useContext(AuthContext)
  const {t} = useTranslation()
  const currentFundraiser = {
    fundraiser: currentUser._id
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/fundraiser/projects", currentFundraiser)
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
            {t('title.6')}
          </Typography>
          </Box>
          <Button
            onClick={() => navigate('/fundraiser-create-project')}
            variant="contained"
            sx={{ minWidth: '100px', textTransform: 'none' }}
            startIcon={<AddIcon />}
          >
           {t('btn.5')}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          {projects && projects.map((data, idx) => {
            if (data.approval == 'Pending') {
              return (
                <FundraiserProjectCard
                  key={idx}
                  title={data.title}
                  raised={data.raised}
                  raisedPercent={data.raisedPercent}
                  goal={data.goal}
                  daysLeft={data.daysLeft}
                  amount={data.amount}
                  status={data.status}
                  approval={data.projectApproval2}
                  request={data.request}
                  view={`/fundraiser-details/${data._id}`}
                  edit={`/fundraiser-update/${data._id}`}
                  pending={(data.projectApproval2 == 'Pending' || data.projectApproval2 == 'waiting') ? true : false}
                />
              )
           }
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          {projects && projects.map((data, idx) => {
            if (data.approval != 'Pending') {
              return (
                <FundraiserProjectCard
                  key={idx}
                  title={data.title}
                  raised={data.raised}
                  raisedPercent={data.raisedPercent}
                  goal={data.goal}
                  daysLeft={data.daysLeft}
                  amount={data.amount}
                  status={data.status}
                  approval={data.projectApproval2}
                  request={data.request}
                  view={`/fundraiser-details/${data._id}`}
                  edit={`/fundraiser-update/${data._id}`}
                  pending={(data.projectApproval2 == 'Pending' || data.projectApproval2 == 'waiting') ? true : false}
                />
              )
            }
          })}
        </Box>
      </div>
    </Box>
  )
}

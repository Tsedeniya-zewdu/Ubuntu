import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FundraiserProjectCard } from '../../components/common/Card/FundraiserProjectCard'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

export const FundraiserProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const { currentUser } = useContext(AuthContext)
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
            Back
          </Button>
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            My Projects
          </Typography>
          </Box>
          <Button
            onClick={() => navigate('/fundraiser-create-project')}
            variant="contained"
            sx={{ minWidth: '100px', textTransform: 'none' }}
            startIcon={<AddIcon />}
          >
            New Project
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
                  approval={data.approval}
                  request={data.request}
                  view={`/fundraiser-details/${data._id}`}
                  edit={`/fundraiser-update/${data._id}`}
                  pending={(data.approval == 'Pending') ? true : false}
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
                  approval={data.approval}
                  request={data.request}
                  view={`/fundraiser-details/${data._id}`}
                  edit={`/fundraiser-update/${data._id}`}
                  pending={(data.approval == 'Pending') ? true : false}
                />
              )
            }
          })}
        </Box>
      </div>
    </Box>
  )
}

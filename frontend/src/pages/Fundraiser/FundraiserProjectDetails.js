import React, { useEffect, useState } from 'react'
import { ProjectDetailsComp } from '../../components/Fundraiser/ProjectDetails/ProjectDetailsComp'
import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const FundraiserProjectDetails = () => {
  const navigate = useNavigate()
  const { pid } = useParams()
  const [project, setProject] = useState()

  // Get a project data from db
  const fetchData = async () => {
    try {
      const res = await axios.get(`/projects/project/${pid}`)
      setProject(res.data)
      console.log('From Project Detail page successs')
      console.log(project)
    } catch (err) {
      console.log('From Project Detail page error')
      console.log(err)
    }
  }
useEffect(() => {
  fetchData()
}, [])
  
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Button
              onClick={() => navigate('/fundraiser-projects')}
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
            <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
              Project Details
            </Typography>
          </Box>
          <Button
            onClick={() => navigate(`/fundraiser-update/${pid}`)}
            variant="contained"
            sx={{ minWidth: '100px', textTransform: 'none' }}
          >
            Edit
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {project && (
            <ProjectDetailsComp
              project={project[0]}
            />
          )}
        </Box>
      </div>
    </Box>
  )
}

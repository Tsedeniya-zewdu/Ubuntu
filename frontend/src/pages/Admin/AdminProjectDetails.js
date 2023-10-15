import React, { useContext, useEffect, useState } from 'react'
import { ProjectDetailsComp } from '../../components/Fundraiser/ProjectDetails/ProjectDetailsComp'
import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const AdminProjectDetails = () => {
  const navigate = useNavigate()
  const { pid } = useParams()
  const [project, setProject] = useState()
  const { approvePendingProject, rejectPendingProject, currentUser } = useContext(
    AuthContext,
  )

  let projectStatus = '' 
  if (currentUser.type == 'Super') {
    if (project && project[0].projectApproval2 == "Pending") {
      projectStatus = 'Pending'
    }
  } else {
    if (project && project[0].projectApproval1 == "Pending") {
      projectStatus = 'Pending'
    }
  }

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

  const handleApprove = () => {
    approvePendingProject(pid).then(() => {
      fetchData()
      navigate(`/admin`)
    })
  }

  const handleReject = () => {
    rejectPendingProject(pid).then(() => {
      fetchData()
      navigate(`/admin`)
    })
  }

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
              onClick={() => navigate((projectStatus == "Pending")? '/admin-notifications' : '/admin-projects')}
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
         {projectStatus == "Pending" && <Box sx={{ display: 'flex', gap: '30px' }}>
            <Button
              onClick={handleApprove}
              variant="contained"
              sx={{ minWidth: '100px', textTransform: 'none' }}
            >
              Approve
            </Button>
            <Button
              onClick={handleReject}
              variant="contained"
              sx={{
                minWidth: '100px',
                textTransform: 'none',
                background: 'gray',
                '&:hover': { background: 'red' },
              }}
            >
              Reject
            </Button>
          </Box>}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {project && project != [] && (
            <ProjectDetailsComp project={project[0]} />
          )}
        </Box>
      </div>
    </Box>
  )
}

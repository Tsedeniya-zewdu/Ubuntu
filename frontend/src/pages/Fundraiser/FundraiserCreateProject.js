import React from 'react'
import { Box } from '@mui/material'
import { CreateProjectForm } from './../../components/CreateProjectForm';

export const FundraiserCreateProject = () => {
  return (
      <Box sx={{ minHeight: '100vh'}}>
          <CreateProjectForm />
    </Box>
  )
}

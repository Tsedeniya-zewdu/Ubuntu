import React from 'react'
import { Box } from '@mui/material'
import { CreateNewsForm } from '../../components/CreateNewsForm'
import { UpdateNewsForm } from '../../components/UpdateNewsForm'

export const AdminCreateNews = () => {
  return (
    <Box sx={{ minHeight: '100vh'}}>
          <UpdateNewsForm />
    </Box>
  )
}
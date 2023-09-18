import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import {  UserDonationsTable } from '../../components/common/Table/UserDonationsTable'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const UserDonations = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Box
          sx={{ display: 'flex', flexDirection: 'column-reverse', gap: '20px' }}
        >
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            My Donations History
          </Typography>
          <Button
            onClick={() => navigate('/user')}
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
        </Box>
        <UserDonationsTable />
      </div>
    </Box>
  )
}

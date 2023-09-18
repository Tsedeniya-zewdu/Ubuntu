import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AdminFundraiserDetailsComp } from './../../components/common/AdminFundraiserDetailsComp';
import axios from 'axios';

export const AdminFundraiserDetails = () => {
  const navigate = useNavigate()
  const {pid} = useParams()
  const [fundraiser, setFundraiser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/fundraiser/${pid}`)
        setFundraiser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Box
          sx={{ display: 'flex', flexDirection: 'column-reverse', gap: '20px' }}
        >
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            My Account
          </Typography>
          <Button
            onClick={() => navigate('/admin-users')}
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
        {fundraiser && <AdminFundraiserDetailsComp projects={23} donations={234} fundraiser={fundraiser}  />}
      </div>
    </Box>
  )
}


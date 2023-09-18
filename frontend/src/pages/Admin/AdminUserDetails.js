import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AdminUserDetailsComp } from './../../components/common/AdminUserDetailsComp';
import axios from 'axios';

export const AdminUserDetails = () => {
  const navigate = useNavigate()
  const {pid} = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let data = {
        role: 'User',
        user: pid
      }
      try {
        const res = await axios.post(`/users/user`, data)
        setUser(res.data)
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
      {user &&  <AdminUserDetailsComp phone='251-123-456-7894' img='/images/profile-icon.png' email='test@test.com' created='Aug 23, 2023' projects={23} donations={234} user={user}  />}
      </div>
    </Box>
  )
}

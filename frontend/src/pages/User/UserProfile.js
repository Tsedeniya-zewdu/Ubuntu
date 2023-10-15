import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { UserProfileComp } from './../../components/common/UserProfileComp';
import { useTranslation } from 'react-i18next';

export const UserProfile = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
        <Box
          sx={{ display: 'flex', flexDirection: 'column-reverse', gap: '20px' }}
        >
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            {t('title.3')}
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
            {t('btn.1')}
          </Button>
        </Box>
        <UserProfileComp img='/images/profile-icon.png' />
      </div>
    </Box>
  )
}


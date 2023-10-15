import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { FundraiserDonationsTable } from '../../components/common/Table/FundraiserDonationsTable'
import { useNavigate } from 'react-router-dom'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

export const FundraiserDonations = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
    <Box sx={{ minHeight: '100vh' }} className="container-wrapper">
      <div className="container">
      <Box sx={{display: 'flex', flexDirection: 'column-reverse', gap: '20px'}}>
          <Typography variant="h5" sx={{ fontWeight: '700', pb: '50px' }}>
            {t('title.5')}
          </Typography>
          <Button
            onClick={() => navigate('/fundraiser')}
            variant="contained"
            sx={{ background: 'gray', mb: '20px', maxWidth: '100px', textTransform: 'none', '&:hover':{background: 'gray'} }}
            startIcon={<ArrowBackIcon />}
          >
            {t('btn.1')}
          </Button>
        </Box>
          <FundraiserDonationsTable />
      </div>
    </Box>
  )
}

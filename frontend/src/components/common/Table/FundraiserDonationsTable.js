import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const FundraiserDonationsTable = () => {
  const {currentUser} = useContext(AuthContext)
  const [donations, setDonations] = useState([])
  const {t} = useTranslation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/donations/fundraiser/${currentUser._id}`)
        setDonations(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // get extract data from database
  let data
  if (donations) {
    data = donations.map((donation) => {
      return {
        id: donation._id,
        title: (donation.project[0] ? donation.project[0].title : ''),
        donator: donation.donator,
        donatedDate: donation.updatedAt,
        donatedAmount: donation.amount,
        paymentMethod: donation.type,
      }
    })
    console.log(data)
  }

  const columns = [
    { field: 'id', headerName: t('fundraiser:donation.1'), width: 200 },
    {
      field: 'donator',
      headerName: t('fundraiser:donation.2'),
      width: 200,
    },
    {
      field: 'title',
      headerName: t('fundraiser:donation.3'),
      width: 330,
    },
    {
      field: 'donatedAmount',
      headerName: t('fundraiser:donation.4'),
      description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: 'donatedDate',
      headerName: t('fundraiser:donation.5'),
      width: 200,
    },
  ]
  
  const rows = data
  return (
    <div>
      <Box sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
        //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}

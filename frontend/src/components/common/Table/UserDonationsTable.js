import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { AuthContext } from './../../../context/AuthContext';
import { useTranslation } from 'react-i18next';


export const UserDonationsTable = (props) => {
  const {currentUser} = useContext(AuthContext)
  const [donations, setDonations] = useState([])

  const { t } = useTranslation()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/donations/user/${currentUser._id}`)
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
        title: donation.project[0] ? donation.project[0].title : '',
        fundraiser: donation.fundraiser[0] ? donation.fundraiser[0].name : '',
        donatedDate: donation.updatedAt,
        donatedAmount: donation.amount,
        paymentMethod: donation.type,
      }
    })
    console.log(data)
  }

  const columns = [
    { field: 'id', headerName: t('user:donation.1'), width: 170 },
    {
      field: 'fundraiser',
      headerName: t('user:donation.2'),
      width: 250,
    },
    {
      field: 'title',
      headerName: t('user:donation.3'),
      width: 350,
    },
    {
      field: 'donatedDate',
      headerName: t('user:donation.4'),
      width: 180,
    },
    {
      field: 'donatedAmount',
      headerName: t('user:donation.5'),
      width: 180,
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


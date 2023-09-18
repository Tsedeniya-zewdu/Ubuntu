import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

export const AdminDonationsTable = () => {
  const [donations, setDonations] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/donations')
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
    console.log(donations)
    data = donations.map((donation) => {
      return {
        id: donation._id,
        donator: donation.donator,
        fundraiser: donation.fundraiser[0] ? donation.fundraiser[0].name : '',
        title: donation.project[0] ? donation.project[0].title : '',
        donationDate: donation.updatedAt,
        donationAmount: donation.amount,
        status: donation.status,
        paymentMethod: donation.type,
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'Donation ID', width: 120 },
    {
      field: 'donator',
      headerName: 'Donator',
      width: 140,
    },
    {
      field: 'fundraiser',
      headerName: 'Fundraiser',
      width: 140,
    },
    {
      field: 'title',
      headerName: 'Project Title',
      width: 200,
    },
    {
      field: 'donationDate',
      headerName: 'Donation Date',
      width: 140,
    },
    {
      field: 'donationAmount',
      headerName: 'Donation Amount',
      width: 140,
    },
    {
      field: 'status',
      headerName: 'Payment Status',
      width: 140,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 140,
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

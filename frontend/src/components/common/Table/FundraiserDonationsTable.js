import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

export const FundraiserDonationsTable = () => {
  const {currentUser} = useContext(AuthContext)
  const [donations, setDonations] = useState([])
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
    { field: 'id', headerName: 'Donation ID', width: 200 },
    {
      field: 'donator',
      headerName: 'Donator Name',
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Project Title',
      width: 330,
    },
    {
      field: 'donatedAmount',
      headerName: 'Donated Amount',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: 'donatedDate',
      headerName: 'Donated Date',
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

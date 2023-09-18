import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { AuthContext } from './../../../context/AuthContext';


export const UserDonationsTable = (props) => {
  const {currentUser} = useContext(AuthContext)
  const [donations, setDonations] = useState([])
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
    { field: 'id', headerName: 'Donation ID', width: 120 },
    {
      field: 'fundraiser',
      headerName: 'Fundraiser Name',
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Project Title',
      width: 310,
    },
    {
      field: 'donatedDate',
      headerName: 'Donation Date',
      width: 180,
    },
    {
      field: 'donatedAmount',
      headerName: 'Donation Amount',
      width: 180,
      },
      ,
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


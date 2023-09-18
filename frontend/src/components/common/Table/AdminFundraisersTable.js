import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'

export const AdminFundraisersTable = () => {
  const navigate = useNavigate()
  const [fundraisers, setFundraisers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/fundraiser')
        setFundraisers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // get extract data from database
  let data
  if (fundraisers) {
    data = fundraisers.map((fundraiser) => {
      return {
        id: fundraiser._id,
        name: fundraiser.name,
        email: fundraiser.email,
        phone: fundraiser.phone,
        bank: fundraiser.bank,
        account: fundraiser.account,
        accountCreated: fundraiser.createdAt,
        action: fundraiser._id
      }
    })
  }
  const columns = [
    { field: 'id', headerName: 'Fundraiser ID', width: 120 },
    {
      field: 'name',
      headerName: 'Name',
      width: 140,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 140,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 140,
    },
    {
      field: 'bank',
      headerName: 'Bank',
      width: 140,
    },
    {
      field: 'account',
      headerName: 'Bank Account',
      width: 210,
    },
    {
      field: 'accountCreated',
      headerName: 'Account Created',
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row
          navigate(`/admin-fundraiser-details/${currentRow.action}`)
        }

        return (
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={onClick}
          >
            View Details
          </Button>
        )
      },
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

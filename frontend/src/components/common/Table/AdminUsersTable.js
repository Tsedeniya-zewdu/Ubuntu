import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'



export const AdminUsersTable = () => {
  const navigate = useNavigate()
  
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/users')
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // get extract data from database
  let data
  if (users) {
    data = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        accountCreated: user.createdAt,
        action: user._id
      }
    })
  }

    const columns = [
        { field: 'id', headerName: 'User ID', width: 120 },
        {
          field: 'name',
          headerName: 'User Name',
          width: 250,
        },
        {
          field: 'email',
          headerName: 'Email Address',
          width: 180,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          width: 200,
        },
        {
          field: 'accountCreated',
          headerName: 'Account Created',
          width: 220,
          },
        {
            field: 'action',
            headerName: 'Action',
            width: 140,
            renderCell: (params) => {
                const onClick = (e) => {
                  const currentRow = params.row;
                  navigate(`/admin-user-details/${currentRow.action}`)
                };
                
                return (
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>View Details</Button>
                );
            },
          },
      ]
    
    const rows = data
  return (
    <div >
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




import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'



export const AdminProjectsTable = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects/all")
        setProjects(res.data)
        console.log(projects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])
    const columns = [
        { field: 'id', headerName: 'Project ID', width: 140 },
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
          field: 'updatedAt',
          headerName: 'Last Updated',
          width: 140,
        },
          {
            field: 'status',
            headerName: 'Status',
            width: 140,
        },
        {
          field: 'raised',
          headerName: 'Raised',
          width: 140,
        },
          {
            field: 'goal',
            headerName: 'Goal',
            width: 140,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 140,
            renderCell: (params) => {
                const onClick = (e) => {
                  const currentRow = params.row;
                  navigate(`/admin-project-details/${currentRow.action}`)
                };
                
                return (
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>View Details</Button>
                );
            },
          },
  ]
  
    // get extract data from database
  let data 
  if (projects) {
    data = projects.map((project) => {
      return {
        id: project._id,
        fundraiser: project.details[0] ? project.details[0].name : '',
        title: project.title,
        updatedAt: project.updatedAt,
        status: project.status,
        raised: project.raised,
        goal: project.amount,
        action: project._id
      }
    })
  }
    // const rows = [
    //     {
    //         id: '1',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'Pending',
    //         status: 'pending',
    //         donators: 0,
    //         donations: 0,
    //         action: '64d34fb8c89df6cb8e308036',
    //     },
    //     {
    //         id: '2',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'approved',
    //         status: 'Open',
    //         donators: 123,
    //         donations: 30000,
    //         action: '64d34fb8c89df6cb8e308036',
    //     },
    //     {
    //         id: '3',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'approved',
    //         status: 'completed',
    //         donators: 234,
    //         donations: 500000,
    //         action: '64d34fb8c89df6cb8e308036',
    //     }
    //     ,
    //     {
    //         id: '4',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'pending',
    //         status: 'pending',
    //         donators: 0,
    //         donations: 0,
    //         action: '64d34fb8c89df6cb8e308036',
    //     },
    //     {
    //         id: '5',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'Pending',
    //         status: 'pending',
    //         donators: 0,
    //         donations: 0,
    //         action: '64d34fb8c89df6cb8e308036',
    //     },
    //     {
    //         id: '6',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'approved',
    //         status: 'Open',
    //         donators: 123,
    //         donations: 30000,
    //         action: '64d34fb8c89df6cb8e308036',
    //     },
    //     {
    //         id: '7',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'approved',
    //         status: 'completed',
    //         donators: 234,
    //         donations: 500000,
    //         action: '64d34fb8c89df6cb8e308036',
    //     }
    //     ,
    //     {
    //         id: '8',
    //         fundraiserName: 'Yohannes Alemu',
    //         title: 'Funds for Empowering Minds, Building Futures',
    //         updatedAt: 'Aug 24, 2023',
    //         publish: 'pending',
    //         status: 'pending',
    //         donators: 0,
    //         donations: 0,
    //         action: '64d34fb8c89df6cb8e308036',
    //     }
    // ]
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


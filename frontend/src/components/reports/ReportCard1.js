import { Typography } from '@mui/material'
import React from 'react'

export default function ReportCard1(props) {
  return (
      <div className='report-card-1'>
          <Typography className='title'>{ props.title}</Typography>
          <Typography className='value'>{ props.value}</Typography>
    </div>
  )
}

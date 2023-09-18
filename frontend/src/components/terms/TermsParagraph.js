import { Typography } from '@mui/material'
import React from 'react'

export const TermsParagraph = (props) => {
    return (
        <>
            <Typography variant='h6' className='terms-title'>{props.title}</Typography>
            <Typography className='terms-text'>{props.text}</Typography>
            </>
  )
}

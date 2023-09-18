import React from 'react'
import "./NewsComp.scss"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NewsCard = (props) => {
  const navigate = useNavigate()
  return (
      <Card className='news-card' onClick={()=> navigate(`/news/${props.path}`)}>
          <CardMedia className='news-card-img' image={props.img} />
          <CardContent className='news-card-content'>
              <Typography variant='h6' className='news-card-title'>{props.title}</Typography>
              <Typography className='news-card-text'>{props.text}</Typography>
          </CardContent>
          <CardActions className='news-card-btn'><Button>Read more</Button></CardActions>
    </Card>
  )
}

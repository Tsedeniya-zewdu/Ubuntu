import React from 'react'
import './NewsComp.scss'
import { NewsCard } from './NewsCard'
import { Box, Grid } from '@mui/material'

const data = [
  {
    title: 'Clean Water Initiative',
    text:
      'Raised funds to install water filtration systems in underprivileged communities, providing clean and safe drinking water to thousands.',
    img: '/images/news-card-img-1.jpg',
  },
  {
    title: 'Education for All',
    text:
      'Collected donations to support scholarships and educational resources for children from low-income families, empowering them to pursue their dreams and break the cycle of poverty.',
    img: '/images/education-img-1.png',
  },
  {
    title: 'Emergency Relief Fund',
    text:
      'Mobilized resources to provide immediate aid and assistance to those affected by natural disasters, offering essential supplies, shelter, and medical support.',
    img: '/images/news-card-img-3.jpg',
  },
  {
    title: 'Food Drive Campaign',
    text:
      'Organized a community-wide food drive to collect non-perishable items for local food banks, ensuring access to nutritious meals for families facing food insecurity.',
    img: '/images/news-card-img-4.jpg',
  },
  {
    title: 'Healthcare Access Project',
    text:
      'Raised funds to establish mobile clinics and medical facilities in remote areas, providing healthcare services and necessary medications to vulnerable populations.',
    img: '/images/news-card-img-5.jpg',
  },
  
]

export const NewsComp = (props) => {
  return (
    <div className="news-comp-wrapper container-wrapper">
      <Box className="news-comp container">
        <Grid container
                    spacing={2}>
          {props.projects.map((data, idx) => {
            return (
              <Grid 
                    key={idx}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <NewsCard title={data.title}
                        text={data.desc}
                  img={data.images[0]}
                  path={data._id}
                    />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}

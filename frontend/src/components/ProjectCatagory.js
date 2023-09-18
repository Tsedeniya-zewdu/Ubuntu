import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { StyledButton } from './Common'

const projects = [
  {
    title: 'Medical',
    desc: 'Provide For Medical & Health',
    icon: '/images/medical-icon.png',
    path: '/project/Medical',
  },
  {
    title: 'Disaster',
    desc: 'For Impacted By Disaster',
    icon: '/images/disaster-icon.png',
    path: '/project/Disaster',
  },
  {
    title: 'Family',
    desc: 'Provide For Families',
    icon: '/images/family-icon.png',
    path: '/project/Family',
  },
  {
    title: 'Children',
    desc: 'Provide For Children',
    icon: '/images/children-icon.png',
    path: '/project/Children',
  },
  {
    title: 'Education',
    desc: 'For Education & Schools',
    icon: '/images/education-icon.png',
    path: '/project/Education',
  },
  {
    title: 'Wildlife',
    desc: 'Provide For Wildlife',
    icon: '/images/wildlife-icon.png',
    path: '/project/Wildlife',
  },
]

export const ProjectCatagory = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pt: { xs: '60px', md: '110px' },
        px: "16px",
      }}
    >
      <Box>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#029a5b',
              fontSize: '16px',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
          >
            POPULar Categories
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' },
              fontWeight: '700',
            }}
          >
            Browse by Categories
          </Typography>
        </Box>
        <StyledButton>Explore</StyledButton>
        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: 'lg',
          }}
        >
          {projects.map((project, idx) => (
            <Grid
              key={idx}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ a: { textDecoration: 'none' } }}
            >
              <Link to={project.path}>
                <Card
                  raised
                  sx={{
                    maxHeight: 137,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    width: "100%",
                    maxWidth: { xs: 'none', sm: '372px' },
                    p: {xs: '15px 10px', sm: '20px 10px', md: '35px 30px'},
                    '&:hover': {
                      borderRight: '3px solid #02a95b',
                      borderBottom: '3px solid #02a95b',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    //   pb: '20px ',
                      gap: '10px',
                      p:0
                    }}
                  >
                    <IconButton
                      sx={{
                        img: {
                          maxWidth: '47px',
                          maxHeight: '47px',
                        },
                      }}
                    >
                      <img src={project.icon} alt="icons" />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: '20px',
                          fontWeight: '700',
                          lineHeight: '24px',
                        }}
                        gutterBottom
                      >
                        {project.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.desc}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

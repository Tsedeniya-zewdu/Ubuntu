import React from 'react'
import { Box, IconButton, InputBase, Typography, Grid } from '@mui/material'
import logo from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import btn from '../assets/right-arrow-btn.png'
import CopyrightIcon from '@mui/icons-material/Copyright'

const projects = [
  {
    title: 'Medical',
    path: '/project/Medical',
  },
  {
    title: 'Disaster',
    path: '/project/Disaster',
  },
  {
    title: 'Family',
    path: '/project/Family',
  },
  {
    title: 'Children',
    path: '/project/Children',
  },
  {
    title: 'Education',
    path: '/project/Education',
  },
  {
    title: 'Wildlife',
    path: '/project/Wildlife',
  },
]

const links = [
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Projects',
    path: '/project/All',
  },
  {
    title: 'News',
    path: '/news',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'FAQ',
    path: '',
  },
  {
    title: 'Terms',
    path: '/terms',
  },
]

const contact = [
  {
    title: 'Phone Number',
    icon: '/images/phone-icon.png',
    data: '(+251)-123-456-789',
  },
  {
    title: 'Email Adress',
    icon: '/images/email-icon.png',
    data: 'info@ubuntu.com',
  },
  {
    title: 'Locations',
    icon: '/images/location-icon.png',
    data: 'Addis Ababa, Ethiopia',
  },
]

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#1f2230',
        pt: { xs: '60px', sm: '80px', md: '90px' },
        pb: '20px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        px: "16px",
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0',
        }}
      >
        <Grid
          container
          sx={{
            width: '100%',
            height: '100%',

            // pb: { xs: '30px', sm: "50px", md: '70px' },
            '.col': {
              p: {
                xs: '0 0 40px 0',
                sm: '0 30px 60px 0',
                md: '0 30px 70px 0',
              },
            },
            '.col:last-child': {
              pr: '0',
            },
            // 'col:nth-child(2)': {
            //   pr: { sm: '0' },
            // },
          }}
        >
          {/* Footer Column 1 About company & Join Newsletter*/}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className="col"
            sx={{
              // width: '328px',
              //   pr: "30px",
              height: '100%',
              '.footer-logo': {
                height: '30px',
                mb: '20px',
              },
            }}
          >
            <img className="footer-logo" src={logo} alt="logo" />
            <Typography
              variant="body2"
              sx={{
                color: '#999ca5',
                lineHeight: '28px',
                fontSize: '16px',
                maxWidth: '350px'
              }}
            >
              We are dedicated to connecting individuals in need with generous donors. Our platform empowers users to make a difference by supporting meaningful causes, while providing fundraisers with the tools to create impactful campaigns.
            </Typography>

            {/* Join Newsletters */}
            {/* <Typography
              variant="h3"
              sx={{
                fontSize: '22px',
                fontWeight: '500',
                color: 'white',
                mt: '20px',
              }}
            >
              Join Newsletters
            </Typography> */}

            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                mt: '20px',
                maxWidth: "300px"
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  border: '1px solid #696969',
                  borderRadius: '50px',
                  py: '10px',
                  px: '20px',
                  m: '0px',

                  //   width: '250px',
                  color: 'white',
                }}
                placeholder="Email Address"
                inputProps={{ 'aria-label': 'Email Address' }}
              />
              <IconButton
                type="button"
                sx={{
                  p: '0px',
                  img: {
                    width: '40px',
                    height: '40px',
                    m: '0',
                    ml: '-20px',
                  },
                }}
                aria-label="news-letter"
              >
                <img src={btn} alt="btn" />
              </IconButton>
            </Box> */}
          </Grid>

          {/* Footer column 2 Projects Links */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            className="col"
            sx={{
              // width: '253px',
              // pr: "30px",
              pr: { sm: '0' },
              height: '100%',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '22px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              Projects
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '15px',
                '>*': {
                  color: '#999ca5',
                  textDecoration: 'none',
                  fontWeight: '400',
                  fontSize: '16px',
                  fontFamily: 'roboto',
                  my: '10px',
                },
              }}
            >
              {projects.map((project, idx) => (
                <Link key={idx} to={project.path}>{project.title}</Link>
              ))}
            </Box>
          </Grid>

          {/* Footer column 3 site links */}
          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            className="col"
            sx={{
              // width: '240px',
              // pr: "30px",
              height: '100%',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '22px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '15px',
                '>*': {
                  color: '#999ca5',
                  textDecoration: 'none',
                  fontWeight: '400',
                  fontSize: '16px',
                  fontFamily: 'roboto',
                  my: '10px',
                },
              }}
            >
              {links.map((link, idx) => (
                <Link key={idx} to={link.path}>{link.title}</Link>
              ))}
            </Box>
          </Grid>

          {/* Footer column 4 contact info */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className="col"
            sx={{
              // width: '257px',
              p: '0',
              height: '100%',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '22px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              Contact
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '15px',
                '>*': {
                  color: '#999ca5',
                  textDecoration: 'none',
                  fontWeight: '400',
                  fontSize: '16px',
                  fontFamily: 'roboto',
                  my: '7px',
                },
              }}
            >
              {contact.map((data, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: '20px',
                    img: {
                      width: '40px',
                      height: '40px',
                      mr: '20px',
                    },
                  }}
                >
                  <img src={data.icon} alt="icons" />
                  <Box>
                    <Typography
                      sx={{
                        color: '#999ca5',
                        textDecoration: 'none',
                        fontWeight: '400',
                        fontSize: '16px',
                        fontFamily: 'roboto',
                        mb: '5px',
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: '16px',
                        fontFamily: 'roboto',
                      }}
                    >
                      {data.data}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom copyright info */}
        <Box
          sx={{
            height: '62px',
            width: '100%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px',
            pl: '20px',
            '>*': {
              color: '#999ca5',
            },
          }}
        >
          <CopyrightIcon />
          <Typography variant="body2">
            2023 Ubuntu. All right reserved{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

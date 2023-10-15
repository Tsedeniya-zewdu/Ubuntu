import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {
  StyledBox1,
  StyledBox2,
  StyledIcon1,
  StyledText1,
  StyledText2,
  StyledTitle1,
  StyledTitle2,
} from './Common'
import img1 from '../assets/about-img-1.jpg'
import makeStyles from '@mui/styles/makeStyles'
import { useTranslation } from 'react-i18next'

const myStyles = makeStyles({
  changeTextColor: {
    color: '#1f2230',
  },
})



export const AboutHome = () => {
  const [current, setCurrent] = useState(0)
  const classes = myStyles()

  const {t} = useTranslation()

  const AboutData = [
    {
      desc:
      t('home:about.1'),
      img: '/images/our-mission-img-1.jpg',
      details: [
        t('home:about.2.1'),
        t('home:about.2.2'),
        t('home:about.2.3'),
        t('home:about.2.4'),
        t('home:about.2.5'),
      ],
    },
    {
      desc:
      t('home:about.3'),
      img: '/images/our-vision-img-1.jpg',
      details: [
        t('home:about.4.1'),
        t('home:about.4.2'),
        t('home:about.4.3'),
        t('home:about.4.4'),
        t('home:about.4.5'),
      ],
    },
    {
      desc:
      t('home:about.5'),
      img: '/images/our-values-img-1.jpg',
      details: [
        t('home:about.6.1'),
        t('home:about.6.2'),
        t('home:about.6.3'),
        t('home:about.6.4'),
        t('home:about.6.5'),
      ],
    },
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        pt: { xs: '60px', md: '110px' },
        px: '16px',
        pb: { xs: '60px', md: '110px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
        }}
      >
        {/* Top */}
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Top Left */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              maxWidth: '697px',
            }}
          >
            <StyledTitle1 gutterBottom>{t('home:about.7.6')}</StyledTitle1>
            <StyledTitle2
              gutterBottom
              variant="h2"
              sx={{
                fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' },
              }}
            >
             {t('home:about.7.1')}
            </StyledTitle2>
          </Box>
          {/* Top Right */}
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: '697px',
              width: { xs: '100%', md: '55%' },
              pl: { xs: '15px', sm: '20px', md: '30px', lg: '40px' },
              borderLeft: '3px solid #029a5b',
            }}
          >
           {t('home:about.7.2')}
          </Typography>
        </Box>
        {/* Bottom */}
        <Box
          sx={{
            display: 'flex',
            pt: '30px',
            alignItems: 'center',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {/* Bottom Left */}
          <Box
            sx={{
              maxWidth: '597px',
              width: { xs: '100%', lg: '50%' },
              pr: '20px',
            }}
          >
            {/* Navigation */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                pb: '10px',
                borderBottom: '6px solid #029a5b',
                mr: '30px',
                button: {
                  px: '20px',
                },
              }}
            >
              <Button
                onClick={() => {
                  setCurrent(0)
                }}
              >
                <StyledText1
                  className={!(current === 0) ? classes.changeTextColor : ''}
                >
                  {t('home:about.7.3')}
                </StyledText1>
              </Button>
              <Button
                onClick={() => {
                  setCurrent(1)
                }}
              >
                <StyledText1
                  className={!(current === 1) ? classes.changeTextColor : ''}
                >
                 {t('home:about.7.4')}
                </StyledText1>
              </Button>
              <Button
                onClick={() => {
                  setCurrent(2)
                }}
              >
                <StyledText1
                  className={!(current === 2) ? classes.changeTextColor : ''}
                >
                 {t('home:about.7.5')}
                </StyledText1>
              </Button>
            </Box>
            {/* our mission, vision, and values */}
            {AboutData.filter((newData, idx) => current === idx).map(
              (data, index) => (
                <StyledBox1
                  key={index}
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <img src={data.img} alt="mission" />
                  <Box>
                    <StyledText2>{data.desc}</StyledText2>
                    <Box
                      sx={{
                        mt: '10px',
                      }}
                    >
                      {data.details.map((detail, idx2) => {
                        return (
                          <StyledBox2 key={idx2}>
                            <StyledIcon1 />
                            <StyledText1>{detail}</StyledText1>
                          </StyledBox2>
                        )
                      })}
                    </Box>
                  </Box>
                </StyledBox1>
              ),
            )}
          </Box>
          {/* Bottom Right */}
          <Box
            sx={{
              maxWidth: '597px',
              width: { xs: '100%', lg: '50%' },
              display: 'flex',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              img: {
                height: '100%',
                objectFit: 'cover',
                maxHeight: '400px',
                width: '100%',
                objectPosition: 'center',
              },
            }}
          >
            <img src={img1} alt="about" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomCard } from './CustomCard'
import { StyledTitle1, StyledTitle2 } from './Common'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const Trending = () => {
  const [projects, setProjects] = useState([])

  const { t } = useTranslation()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/projects')
        setProjects(res.data)
        // console.log(projects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (<>
    {projects.length > 2 && <Box
      sx={{
        width: '100%',
        px: '16px',
        display: 'flex',
        justifyContent: 'center',
        pt: { xs: '60px', md: '110px' },
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          width: '100%',
        }}
      >
        <Box>
          <Box
            sx={{
              '>*': {
                textAlign: 'center',
              },
            }}
          >
            <StyledTitle1 gutterBottom>{t('home:project.1')} </StyledTitle1>
            <StyledTitle2
              gutterBottom
              variant="h2"
              sx={{
                fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' },
              }}
            >
              {t('home:project.2')}
            </StyledTitle2>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '20px',
              pt: '20px',
              px: '5px',
              pb: '5px',
            }}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                '599': {
                  slidesPerView: 1,
                  spaceBetween: 1,
                },
                '600': {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                '900': {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination]}
              loop={true}
              autoplay={true}
              className="mySwiper"
            >
              {projects &&
                projects.map((project, idx) => {
                  let progress = parseFloat(
                    (project.raised / project.amount) * 100,
                  ).toFixed(2)
                  let dateNow = new Date()
            let dateObj = new Date(project.deadline)
            let daysLeft = Math.floor((Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24))
                  return (
                    <SwiperSlide key={idx}>
                      <CustomCard
                        catagory={project.catagory}
                        title={project.title}
                        name={project.details[0].name}
                        avatar={project.details[0].image}
                        img={project.images[0]}
                        days={daysLeft}
                        desc={project.desc}
                        raised={project.raised}
                        percent={progress}
                        goal={project.amount}
                        path={project._id}
                      />
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Box>}
    </>
  )
}

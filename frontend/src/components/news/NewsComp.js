import React from 'react'
import './NewsComp.scss'
import { NewsCard } from './NewsCard'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const NewsComp = (props) => {
  console.log(props.project)
  const { t } = useTranslation()
  
  return (
    <div className="news-comp-wrapper container-wrapper">
      <Box className="news-comp container">
        {props.projects.map((data, idx) => {
          let dateNow = new Date()
          let dateObj = new Date(data.released)
          let year = dateNow.getUTCFullYear() - dateObj.getUTCFullYear()
          let month = dateNow.getUTCMonth() - dateObj.getUTCMonth()
          let day = dateNow.getUTCDate() - dateObj.getUTCDate()
          let hour = dateNow.getUTCHours() - dateObj.getUTCHours()
          let min = dateNow.getUTCMinutes() - dateObj.getUTCMinutes()
          year = year != 0 ? `${year}${t('project:story.3')}` : ''
          month = month != 0 && month > 0 ? `${month}${t('project:story.4')}` : ''
          day = day != 0 && day > 0 ? `${day}${t('project:story.5')}` : ''
          hour = hour != 0 && hour > 0 ? `${hour}${t('project:story.6')}` : ''
          min =
            min != 0 && min > 0
              ? `${min}${t('project:story.7')}`
              : `0${t('project:story.7')}`
          let timeAndDate
          if (year != '') {
            timeAndDate = `${year} ${t('project:story.8')}`
          } else if (month != '') {
            timeAndDate = `${month}  ${t('project:story.8')}`
          } else if (day != '') {
            timeAndDate = `${day}  ${t('project:story.8')}`
          } else if (hour != '') {
            timeAndDate = `${hour}  ${t('project:story.8')}`
          } else {
            timeAndDate = `${min}  ${t('project:story.8')}`
          }
          return (
            <NewsCard
              title={data.title}
              text={data.newsdesc}
              img={`http://localhost:5000/api/uploads/${data.newsimages[0]}`}
              path={data._id}
              released={timeAndDate}
              name={data.details[0].name}
              avator={data.details[0].image}
            />
          )
        })}
      </Box>
    </div>
  )
}

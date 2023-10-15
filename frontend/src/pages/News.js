import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { NewsComp } from '../components/news/NewsComp'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const News = () => {
  const [projects, setProjects] = useState([])
  const {t} = useTranslation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects/news")
        // let temp = res.data.filter((data) => {
        //   data.status = 'Completed'
        // })
        setProjects(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <Banner title={t('banner.3')} img="/images/news-banner.jpg" />
      {projects && <NewsComp projects={projects} />}
    </div>
  )
}

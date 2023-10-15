import React, { useEffect, useState } from 'react'
import { Banner } from './../components/Banner';
import { NewsDetailsComp } from '../components/news/NewsDetailsComp';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const NewsDetails = () => {
    const {nid} = useParams()
    const [project, setProject] = useState()
    
    const {t} = useTranslation()
  // Get a project data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${nid}`)
        setProject(res.data[0])
        // console.log(res.data[0])
      } catch (err) {
        // console.log('From Project Detail page error')
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
      <div>
          <Banner title={t('banner.4')} img="/images/news-banner.jpg" />
          {project && <NewsDetailsComp project={project} />}
    </div>
  )
}

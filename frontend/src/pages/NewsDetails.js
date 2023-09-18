import React, { useEffect, useState } from 'react'
import { Banner } from './../components/Banner';
import { NewsDetailsComp } from '../components/news/NewsDetailsComp';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const NewsDetails = () => {
    const {nid} = useParams()
    const [project, setProject] = useState()
    
    
  // Get a project data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${nid}`)
        setProject(res.data)
        // console.log(res.data)
      } catch (err) {
        // console.log('From Project Detail page error')
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
      <div>
          <Banner title='News Details' img="/images/news-banner.jpg" />
          {project && <NewsDetailsComp project={project[0]} />}
    </div>
  )
}

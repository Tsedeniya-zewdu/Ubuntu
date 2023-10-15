import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { ProjectComp } from '../components/ProjectComp'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Project = () => {
  const {cid} = useParams()
  const [projects, setProjects] = useState([])
  const {t} = useTranslation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects")
        setProjects(res.data)
        console.log(projects)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <Banner title={t('banner.5')} img="/images/project-banner.jpg"/>
      <ProjectComp
      projects = {projects}
      />
    </div>
  )
}

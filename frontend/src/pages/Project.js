import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { ProjectComp } from '../components/ProjectComp'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const Project = () => {
  const {cid} = useParams()
  const [projects, setProjects] = useState([])
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
      <Banner title="Projects" img="/images/project-banner.jpg"/>
      <ProjectComp
      projects = {projects}
      />
    </div>
  )
}

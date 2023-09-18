import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { NewsComp } from '../components/news/NewsComp'
import axios from 'axios'

export const News = () => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects/completed")
        // let temp = res.data.filter((data) => {
        //   data.status = 'Completed'
        // })
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
      <Banner title="Our News" img="/images/news-banner.jpg" />
      {projects && <NewsComp projects={projects} />}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { ProjectBanner } from '../components/ProjectBanner'
import { ProjectStory } from '../components/ProjectStory'
import { Trending } from '../components/Trending'
import { Box } from '@mui/material'
import { DonationComp } from '../components/DonationComp'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Payment } from '../components/Payment'

export const ProjectDetails = () => {
  const { pid } = useParams()
  const [project, setProject] = useState()
  const [donators, setDonators] = useState([])

  // onclick make button to scroll down
  const handleClickScroll = () => {
    const element = document.getElementById('donation-form')
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Get a project data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${pid}`)
        setProject(res.data)
        // console.log(res.data)
      } catch (err) {
        // console.log('From Project Detail page error')
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // get donation data from db

  useEffect(() => {
    const fetchData = async () => {
      if (project) {
        const res = await axios.get(`/donations/project/${project[0]._id}`)
        try {
          setDonators(res.data)
          console.log(res.data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
    
  }, [project])

  useEffect(() => {
    const calculateRaisedAmount = async () => {
      if (donators && project) {
        let sum = 0
        let status = 'Open'
        let completed
        donators.forEach((data) => {
            sum += data.amount
        })
        let dateNow = new Date()
        let dateObj = new Date(project[0].deadline)
        let days = Math.floor(
          (Date.parse(dateObj) - Date.parse(dateNow)) / (1000 * 60 * 60 * 24)
        )
        if (sum >= project[0].amount) {
          status = 'Completed'
          completed = Date.now()
        } else if (days < 0) {
          status = 'Expired'
        }  

        let data = {
          id: project[0]._id,
          raised: sum,
          status: status,
        }
        // console.log(sum)

        if (sum != project[0].raised || data.status != project[0].status) {
          await axios.patch('/projects/update/', data)
        }
      }
    }
    calculateRaisedAmount()
  }, [donators])

  return (
    <>
      {project && (
        <div>
          {/* <Banner title="Project Details" /> */}
          <ProjectBanner
            handleClickScroll={handleClickScroll}
            project={project[0]}
          />
          <ProjectStory project={project[0]} donators={donators}/>
          {/* <DonationComp project={project[0]} donators={donators} /> */}
          <Payment project={project[0]} donators={donators} />
          <Box sx={{ pb: { xs: '60px', md: '110px' } }}>
            <Trending />
          </Box>
        </div>
      )}
    </>
  )
}

import React from 'react'
import { MainBanner } from '../components/MainBanner'
import { Promo } from '../components/Promo'
import { ProjectCatagory } from './../components/ProjectCatagory'
import { Trending } from './../components/Trending'
import { AboutHome } from './../components/AboutHome'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'

export const Home = () => {
  return (
    <div>
      <MainBanner />
      <Promo />
      <ProjectCatagory />
      <Trending />
      <AboutHome />
    </div>
  )
}

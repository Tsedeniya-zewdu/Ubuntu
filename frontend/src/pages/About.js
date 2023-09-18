import React from 'react'
import { Banner } from '../components/Banner'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AboutHome } from './../components/AboutHome';


export const About = () => {
  return (
    <div
    >
      <Banner title="About Us" img="/images/about-banner.jpg" />
      <AboutHome />
     </div>
  )
}

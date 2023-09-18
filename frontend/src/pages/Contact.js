import React from 'react'
import { Banner } from '../components/Banner'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
// import { ContactComp } from '../components/contact/ContactComp'
import { ContactComp } from './../components/contact/ContactComp';

export const Contact = () => {
  return (
    <div>

      <Banner title="Contact Us" img="/images/contact-banner.jpg"/>
      <ContactComp />
    </div>
  )
}

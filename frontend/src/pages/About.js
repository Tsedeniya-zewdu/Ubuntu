import React from 'react'
import { Banner } from '../components/Banner'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AboutHome } from './../components/AboutHome';
import { useTranslation } from 'react-i18next';


export const About = () => {
  const {t} = useTranslation()
  return (
    <div
    >
      <Banner title={t('banner.1')} img="/images/about-banner.jpg" />
      <AboutHome />
     </div>
  )
}

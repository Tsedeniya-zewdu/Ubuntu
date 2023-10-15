import React from 'react'
import { Banner } from '../components/Banner'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
// import { ContactComp } from '../components/contact/ContactComp'
import { ContactComp } from './../components/contact/ContactComp';
import { useTranslation } from 'react-i18next';

export const Contact = () => {
  const {t} = useTranslation()
  return (
    <div>

      <Banner title={t('banner.2')} img="/images/contact-banner.jpg"/>
      <ContactComp />
    </div>
  )
}

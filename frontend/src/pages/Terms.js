import React from 'react'
import { Banner } from '../components/Banner'
import { TermsComp } from '../components/terms/TermsComp'
import { useTranslation } from 'react-i18next'


export const Terms = () => {
  const {t} = useTranslation()
  return (
      <div>
          <Banner title={t('banner.6')} img="/images/education-img-1.png" />
          <TermsComp />
    </div>
  )
}

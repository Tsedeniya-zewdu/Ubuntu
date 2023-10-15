import React from 'react'
import "./TermsComp.scss"
import { TermsParagraph } from './TermsParagraph'
import { useTranslation } from 'react-i18next'



export const TermsComp = () => {

    const {t} = useTranslation()

    const data = [
        {
            title: t('term:1.title'),
            text: t('term:1.desc')
        },
        {
            title: t('term:2.title'),
            text: t('term:2.desc')
        },
        {
            title: t('term:3.title'),
            text: t('term:3.desc')
        },
        {
            title: t('term:4.title'),
            text: t('term:4.desc')
        },
        {
            title: t('term:5.title'),
            text: t('term:5.desc')
        },
        {
            title: t('term:6.title'),
            text: t('term:6.desc')
        },
        {
            title: t('term:7.title'),
            text: t('term:7.desc')
        },
        {
            title: t('term:8.title'),
            text: t('term:8.desc')
        },
        {
            title: t('term:9.title'),
            text: t('term:9.desc')
        },
        {
            title: t('term:10.title'),
            text: t('term:10.desc')
        },
        {
            title: t('term:11.title'),
            text: t('term:11.desc')
        },
        {
            title: t('term:12.title'),
            text: t('term:12.desc')
        }
    ]
  return (
      <div className='terms-comp-wrapper container-wrapper'>
          <div className='terms-comp container'>
              {data.map((data1) => {
                  return (
                      <TermsParagraph text={data1.text} title={data1.title} />
                  )
              })}
          </div>
    </div>
  )
}

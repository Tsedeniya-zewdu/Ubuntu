import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { FooterCommon } from './components/common/Footer/FooterCommon'
import { AuthContext } from './context/AuthContext'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'
import { useTranslation } from 'react-i18next'



export const ProtectedFundraiserRoutes = () => {
  const { currentUser } = useContext(AuthContext)

  const {t} = useTranslation()

  const pages = [
    {
      title: t('navlinks.1'),
      path: '/',
    },
    {
      title: t('navlinks.12'),
      path: '/fundraiser',
    },
    {
      title: t('navlinks.2'),
      path: '/about',
    },
    {
      title: t('navlinks.3'),
      path: '/project/All',
    },
    {
      title: t('navlinks.4'),
      path: '/news',
    },
    {
      title: t('navlinks.13'),
      path: '/fundraiser-projects',
    },
    {
      title: t('navlinks.14'),
      path: '/fundraiser-donations',
    },
  ]

  return (
    <div>
      {currentUser && currentUser.role == 'Fundraiser' ? (
        <>
          <NavbarCommon
            notification="/fundraiser-notifications"
            messages="/fundraiser-messages"
            pages={pages}
            dashboard="/fundraiser"
            profile="fundraiser-profile"
          />
          <Outlet />
          <FooterCommon />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'
import { useTranslation } from 'react-i18next'



export const ProtectedUserRoutes = () => {
  const {t} = useTranslation()
  const pages = [
    {
      title: t('navlinks.1'),
      path: '/',
    },
    {
      title: t('navlinks.12'),
      path: '/user',
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
      title: t('navlinks.14'),
      path: '/user-donations',
    },
  ]
  const { currentUser } = useContext(AuthContext)
  return (
    <div>
      {currentUser && currentUser.role == 'User' ? (
        <>
          <NavbarCommon
            messages="/user-messages"
            notification="/user-notifications"
            pages={pages}
            dashboard="/user"
            profile="user-profile"
          />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { FooterCommon } from './components/common/Footer/FooterCommon'
import { AuthContext } from './context/AuthContext'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'
import { useTranslation } from 'react-i18next'



export const ProtectedAdminRoutes = () => {
  const { currentUser } = useContext(AuthContext)
  const { t } = useTranslation()
  
  const pages = [
    {
      title: t('navlinks.12'),
      path: '/admin',
    },
    {
      title: t('navlinks.3'),
      path: '/admin-projects',
    },
    {
      title: t('navlinks.19'),
      path: '/admin-donations',
    },
    {
      title: t('navlinks.16'),
      path: '/admin-fundraisers',
    },
    {
      title: t('navlinks.17'),
      path: '/admin-users',
    },
    {
      title: t('navlinks.4'),
      path: '/admin-news',
    },
    // {
    //   title: t('navlinks.24'),
    //   path: '/admin-reports',
    // },

  ]

  return (
    <div>
      {currentUser && currentUser.role === 'Admin' ? (
        <>
          <NavbarCommon
            notification="/admin-notifications"
            messages="/admin-messages"
            pages={pages}
            dashboard="/admin"
            profile="admin-profile"
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

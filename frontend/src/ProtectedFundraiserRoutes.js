import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { FooterCommon } from './components/common/Footer/FooterCommon'
import { AuthContext } from './context/AuthContext'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'

const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Dashboard',
    path: '/fundraiser',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Projects',
    path: '/project/All',
  },
  {
    title: 'News',
    path: '/news',
  },
  {
    title: 'My Projects',
    path: '/fundraiser-projects',
  },
  {
    title: 'My Donations',
    path: '/fundraiser-donations',
  },
]

export const ProtectedFundraiserRoutes = () => {
  const { currentUser } = useContext(AuthContext)
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

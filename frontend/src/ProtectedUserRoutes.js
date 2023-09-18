import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'

const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Dashboard',
    path: '/user',
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
    title: 'My Donations',
    path: '/user-donations',
  },
]

export const ProtectedUserRoutes = () => {
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

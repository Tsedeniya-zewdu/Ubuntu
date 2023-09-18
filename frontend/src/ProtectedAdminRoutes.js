import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { FooterCommon } from './components/common/Footer/FooterCommon'
import { AuthContext } from './context/AuthContext'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'

const pages = [
  {
    title: 'Dashboard',
    path: '/admin',
  },
  {
    title: 'Approved Projects',
    path: '/admin-projects',
  },
  {
    title: 'Donation Transactions',
    path: '/admin-donations',
  },
  {
    title: 'Fundraisers',
    path: '/admin-fundraisers',
  },
  {
    title: 'Users',
    path: '/admin-users',
  },
]

export const ProtectedAdminRoutes = () => {
  const { currentUser } = useContext(AuthContext)
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

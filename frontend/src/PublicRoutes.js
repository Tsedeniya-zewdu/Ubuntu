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
    title: 'Contact',
    path: '/contact',
  },
]

const pages1 = [
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

const pages2 = [
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

const pages3 = [
  {
    title: 'Dashboard',
    path: '/admin',
  },
  {
    title: 'Projects',
    path: '/admin-projects',
  },
  {
    title: 'Donations',
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

export const PublicRoutes = () => {
  const { currentUser } = useContext(AuthContext)
  let loggedIn = false
  let dashboard
  let profile
  let notification
  let messages
  let navbar
  if (currentUser) {
    if (
      currentUser.role == 'Admin' ||
      currentUser.role == 'User' ||
      currentUser.role == 'Fundraiser'
    ) {
      loggedIn = true
    } else {
      loggedIn = false
    }

    if (currentUser.role == 'Admin') {
      dashboard = '/admin'
      profile = '/admin-profile'
      notification = '/admin-notifications'
      messages = '/admin-messages'
      navbar = pages
    } else if (currentUser.role == 'User') {
      dashboard = '/user'
      profile = '/user-profile'
      notification = '/user-notifications'
      messages = '/user-messages'
      navbar = pages2
    } else if (currentUser.role == 'Fundraiser') {
      dashboard = '/fundraiser'
      profile = '/fundraiser-profile'
      notification = '/fundraiser-notifications'
      messages = '/fundraiser-messages'
      navbar = pages1
    }
  }

  return (
    <>
      {loggedIn ? (
        <NavbarCommon
          messages={messages}
          notification={notification}
          pages={navbar}
          dashboard={dashboard}
          profile={profile}
        />
      ) : (
        <Navbar pages={pages} />
      )}
      <Outlet />
      <Footer />
    </>
  )
}

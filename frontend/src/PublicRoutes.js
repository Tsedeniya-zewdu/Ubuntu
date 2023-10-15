import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { NavbarCommon } from './components/common/Navbar/NavbarCommon'
import { useTranslation } from 'react-i18next'



export const PublicRoutes = () => {
  const {t} = useTranslation()

const pages = [
  {
    title: t('navlinks.1'),
    path: '/',
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
    title: t('navlinks.5'),
    path: '/contact',
  },
]

const pages1 = [
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

const pages2 = [
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

const pages3 = [
  {
    title: t('navlinks.12'),
    path: '/admin',
  },
  {
    title: t('navlinks.3'),
    path: '/admin-projects',
  },
  {
    title: t('navlinks.15'),
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
]
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

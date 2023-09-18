import React from 'react'
import './Navbar.scss'
import {
  Container,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Button,
  Toolbar,
  AppBar,
  MenuItem,
  Menu,
  Typography,
  Badge,
} from '@mui/material'
import logo from '../../../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { useEffect, useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../../context/AuthContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const NavbarCommon = (props) => {
  const location = useLocation()
  const {
    currentUser,
    logout,
    userNotifications,
    getUserNotifications,
    markUserNotificationsAsSeen,
    getAdminNotifications,
    adminNotifications,
    getFundraiserNotifications,
    fundraiserNotifications
  } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname == '/user-notifications' || location.pathname == '/fundraiser-notifications') {
      markUserNotificationsAsSeen()
    }
  }, [])

  if (currentUser.role == 'User') {
    getUserNotifications()
  } else if (currentUser.role == 'Fundraiser') {
    getFundraiserNotifications()
  } else if (currentUser.role == 'Admin') {
    getAdminNotifications()
  }
  
  let notificationCounter = 0
  if (currentUser.role == 'Admin') {
    notificationCounter = adminNotifications
  } else if (currentUser.role == 'User') {
    notificationCounter = userNotifications
  } else if (currentUser.role == 'Fundraiser') {
    notificationCounter = fundraiserNotifications
  }

  const [anchorEl1, setAnchorEl1] = useState(null)
  const open1 = Boolean(anchorEl1)
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget)
  }
  const handleClose1 = () => {
    setAnchorEl1(null)
  }

  const [anchorEl2, setAnchorEl2] = useState(null)
  const open2 = Boolean(anchorEl2)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Toolbar className="navbar-toolbar">
      <AppBar className="navbar-appbar">
        <Container className="navbar-container">
          <Toolbar className="navbar-inner-toolbar">
            <Box className="navbar-inner-toolbar-box">
              {/* Navigation Links wrapper */}
              <Box className="navlinks-wrapper">
                {/* Logo */}
                <Link to="/">
                  <IconButton className="logo-icon-button">
                    <img src={logo} alt="logo" />
                  </IconButton>
                </Link>
                {/* Navigation Links */}
                <Box className="navlinks-box">
                  {props.pages.map((page) => (
                    <NavLink key={page.path} to={page.path}>
                      <Button className="navlink-button" key={page}>
                        {page.title}
                      </Button>
                    </NavLink>
                  ))}
                </Box>
              </Box>
              {/* Rightside nav items wrapper */}
              <Box className="right-side-wrapper">
                <IconButton
                  onClick={() => navigate(props.messages)}
                  className="notification"
                >
                  <Badge
                    color="primary"
                    // badgeContent={1000}
                    max={99}
                  >
                    <MailOutlineOutlinedIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={() => navigate(props.notification)}
                  className="notification"
                >
                  <Badge
                    color="primary"
                    badgeContent={notificationCounter}
                    max={999}
                  >
                    <NotificationsOutlinedIcon />
                  </Badge>
                </IconButton>
                {/* my-account wrapper */}
                <Box className="my-account-wrapper">
                  {/* my account */}
                  <Box
                    id="basic-button1"
                    aria-controls={open1 ? 'basic-menu1' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? 'true' : undefined}
                    onClick={handleClick1}
                  >
                    <Tooltip title="My Account">
                      {currentUser.image != '' ? (
                        <img className="my-account-avatar"
                          src={`http://localhost:5000/api/uploads/${currentUser.image}`}
                        />
                      ) : (
                        <Avatar className="my-account-avatar" />
                      )}
                    </Tooltip>
                  </Box>
                </Box>
                {/* my account Dropdown */}
                <Menu
                  id="basic-menu1"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button1',
                  }}
                  className="my-account-dropdown"
                  sx={{
                    '.name-role-wrapper': {
                      p: '10px',
                      px: '16px',
                      '.name': {
                        fontSize: '16px',
                        textTransform: 'capitalize',
                        fontWeight: '700',
                        color: '#2222222',
                      },
                      '.role': {
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        color: '#bdbdbd',
                      },
                    },
                    a: {
                      textDecoration: 'none',
                      color: 'black',
                    },
                  }}
                >
                  <Box className="name-role-wrapper">
                    <span className="name">{currentUser.name}</span>
                    <span className="role"> - {currentUser.role}</span>
                  </Box>
                  <NavLink to={props.dashboard}>
                    <MenuItem onClick={handleClose1}>Dashboard</MenuItem>
                  </NavLink>

                  <NavLink to={props.profile}>
                    <MenuItem onClick={handleClose1}>My Profile</MenuItem>
                  </NavLink>

                  <NavLink
                    onClick={() => {
                      logout()
                        .then((res) => {
                          navigate('/')
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    }}
                  >
                    <MenuItem onClick={handleClose1}>Logout</MenuItem>
                  </NavLink>
                </Menu>

                {/* Humberger menu */}
                <Box
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  className="humberger-menu"
                >
                  <MenuIcon className="menu-icon" />
                </Box>
                {/* Hamber menu dropdown */}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{
                    a: {
                      textDecoration: 'none',
                      color: 'black',
                    },
                    '.active': {
                      borderBottom: '3px solid #029a5b',
                      '>*': {
                        color: '#029a5b',
                      },
                    },
                  }}
                >
                  {props.pages.map((page) => (
                    <NavLink key={page.path} to={page.path}>
                      <MenuItem key={page.path} onClick={handleClose}>
                        {page.title}
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Toolbar>
  )
}

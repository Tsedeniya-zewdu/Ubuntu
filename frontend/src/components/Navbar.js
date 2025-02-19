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
  InputBase,
  Typography,
} from '@mui/material'
import logo from '../assets/logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import LanguageIcon from '@mui/icons-material/Language';

export default function Navbar(props) {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorEl1, setAnchorEl1] = useState(null)
  const open1 = Boolean(anchorEl1)
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget)
  }
  const handleClose1 = () => {
    setAnchorEl1(null)
  }

  const { t, i18n } = useTranslation()

  function clickLanguage(lang) {
    i18n.changeLanguage(lang)
  }

  const [anchorEl2, setAnchorEl2] = useState(null)

  const open2 = Boolean(anchorEl2)
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Toolbar sx={{ position: 'relative' }}>
      <AppBar
        sx={{
          position: 'fixed',
          top: '0',
          left: '0',
          padding: '0',
          width: '100%',
          px: '16px',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            p: '0',
          }}
        >
          <Toolbar sx={{ px: '0', alignItems: 'center' }}>
            <Box
              sx={{
                width: '100%',
                display: { xs: 'flex' },
                justifyContent: { xs: 'space-between' },
                alignItems: 'center',
                padding: '0',
              }}
            >
              {/* Navigation Links wrapper */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/">
                  <IconButton
                    sx={{
                      width: 'auto',
                      maxWidth: { xs: '150px' },
                      p: '0',
                      '>*': {
                        width: '100%',
                        objectFit: 'contain',
                      },
                    }}
                  >
                    <img src={logo} alt="logo" />
                  </IconButton>
                </Link>
                {/* Navigation Links */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    marginLeft: { md: '80px', lg: '120px' },
                    a: {
                      textDecoration: 'none',
                    },
                    '.active': {
                      // borderBottom: '4px solid #029a5b',
                      '>*': {
                        color: '#029a5b',
                      },
                      '&:hover': {
                        borderBottom: '0',
                      },
                    },
                  }}
                >
                  {props.pages.map((page) => (
                    <NavLink key={page.path} to={page.path}>
                      <Button
                        key={page}
                        sx={{
                          color: 'black',
                          display: 'block',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: '500',
                          px: '18px',
                          pt: '16px',
                          pb: '16px',
                          borderRadius: '0',
                          '&:hover': {
                            color: '#029a5b',
                          },
                        }}
                      >
                        {page.title}
                      </Button>
                    </NavLink>
                  ))}
                </Box>
              </Box>
              {/* Rightside nav items wrapper */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { xs: 'row', md: 'row-reverse' },
                }}
              >
                {/* search-login/register wrapper */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '> button': {
                      textTransform: 'capitalize',
                      fontSize: '15px',
                      fontWeight: '400',
                    },
                  }}
                >
                  <Button onClick={() => navigate('/login')}>
                    {t('navlinks.10')}
                  </Button>
                  <Button
                    sx={{
                      mr: '20px',
                      pr: '20px',
                      borderRight: '1px solid #e6eaeb',
                      borderRadius: '0px',
                    }}
                    onClick={() => navigate('/register')}
                  >
                    {t('navlinks.11')}
                  </Button>
                  {/* Language select */}
                  <IconButton sx={{ fontWeight: '400' }} onClick={handleClick2}>
                    <LanguageIcon className="language-icon" />
                  </IconButton>
                  <Box>
                    <Menu
                      id="basic-menu1"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button1',
                      }}
                      sx={{
                        zIndex: '999999',
                        '>*': {
                          fontWeight: '400',
                          fontSize: '14px',
                        },
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
                      <Box onClick={() => clickLanguage('en')}>
                        <MenuItem onClick={handleClose2}>English</MenuItem>
                      </Box>
                      <Box onClick={() => clickLanguage('am')}>
                        <MenuItem onClick={handleClose2}>አማርኛ</MenuItem>
                      </Box>
                    </Menu>
                  </Box>
                </Box>

                {/* Login / Register Dropdown */}
                <Menu
                  id="basic-menu1"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button1',
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
                  <Typography
                    sx={{
                      color: '#029a5b',
                      fontWeight: '700',
                      px: '15px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {currentUser ? currentUser.name : ''}
                  </Typography>
                  {currentUser && (
                    <NavLink to={props.dashboard}>
                      <MenuItem onClick={handleClose1}>{t('navlinks.12')}</MenuItem>
                    </NavLink>
                  )}
                  {currentUser ? (
                    <NavLink to={props.profile}>
                      <MenuItem onClick={handleClose1}>{t('navlinks.20')}</MenuItem>
                    </NavLink>
                  ) : (
                    <NavLink to="/login">
                      <MenuItem onClick={handleClose1}>{t('navlinks.10')}</MenuItem>
                    </NavLink>
                  )}
                  {currentUser ? (
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
                      <MenuItem onClick={handleClose1}>{t('navlinks.21')}</MenuItem>
                    </NavLink>
                  ) : (
                    <NavLink to="/register">
                      <MenuItem onClick={handleClose1}>{t('navlinks.11')}</MenuItem>
                    </NavLink>
                  )}
                </Menu>

                {/* Humberger menu */}
                <Box
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    p: '0',
                    display: 'flex',
                    alignItems: 'center',
                    ml: '5px',
                  }}
                >
                  <MenuIcon
                    sx={{
                      color: 'black',
                      width: { xs: 30, sm: 40 },
                      height: { xs: 30, sm: 40 },
                      display: { xs: 'block', md: 'none' },
                    }}
                  />
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

import { Box, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Project } from './pages/Project'
import { News } from './pages/News'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProjectDetails } from './pages/ProjectDetails'
import { useEffect } from 'react'
import { OTPInput } from './pages/OTPInput'
import { PasswordReset } from './pages/PasswordReset'
import { ForgotPassword } from './pages/ForgotPassword'
import { ProtectedAdminRoutes } from './ProtectedAdminRoutes'
import { ProtectedFundraiserRoutes } from './ProtectedFundraiserRoutes'
import { ProtectedUserRoutes } from './ProtectedUserRoutes'
import { FundraiserDashboard } from './pages/Fundraiser/FundraiserDashboard'
import { FundraiserNotifications } from './pages/Fundraiser/FundraiserNotifications'
import { FundraiserProjects } from './pages/Fundraiser/FundraiserProjects'
import { FundraiserDonations } from './pages/Fundraiser/FundraiserDonations'
import { FundraiserMessages } from './pages/Fundraiser/FundraiserMessages'
import { FundraiserProfile } from './pages/Fundraiser/FundraiserProfile'
import { FundraiserCreateProject } from './pages/Fundraiser/FundraiserCreateProject'
import { FundraiserUpdateProject } from './pages/Fundraiser/FundraiserUpdateProject'
import { FundraiserProjectDetails } from './pages/Fundraiser/FundraiserProjectDetails'
import { UserDashboard } from './pages/User/UserDashboard'
import { UserDonations } from './pages/User/UserDonations'
import { UserNotifications } from './pages/User/UserNotifications'
import { UserProfile } from './pages/User/UserProfile'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { AdminDonations } from './pages/Admin/AdminDonations'
import { AdminFundraiserDetails } from './pages/Admin/AdminFundraiserDetails'
import { AdminFundraisers } from './pages/Admin/AdminFundraisers'
import { AdminNotifications } from './pages/Admin/AdminNotifications'
import { AdminProfile } from './pages/Admin/AdminProfile'
import { AdminProjectDetails } from './pages/Admin/AdminProjectDetails'
import { AdminProjects } from './pages/Admin/AdminProjects'
import { AdminUserDetails } from './pages/Admin/AdminUserDetails'
import { AdminUsers } from './pages/Admin/AdminUsers'
import { UserMessages } from './pages/User/UserMessages'
import { PublicRoutes } from './PublicRoutes'
import { AdminMessages } from './pages/Admin/AdminMessages'
import { AdminReports } from './pages/Admin/AdminReports'
import { AdminRegister } from './pages/AdminRegister'
import { ThankYou } from './pages/ThankYou'
import { EmailVerification } from './pages/EmailVerification'
import { EmailVerified } from './pages/EmailVerified'
import { PasswordResetLink } from './pages/PasswordResetLink'
import { PasswordReseted } from './pages/PasswordReseted'
import { Error } from './pages/Error'
import { AdminLogin } from './pages/AdminLogin'
import { Terms } from './pages/Terms'
import { NewsDetails } from './pages/NewsDetails'

const theme = createTheme({
  palette: {
    primary: {
      main: '#029a5b',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
        },
      },
    },
  },
})

function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Routes>
          <Route element={<PublicRoutes />}>            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project/:cid" element={<Project />} />
            <Route path="/projects/:pid" element={<ProjectDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:nid" element={<NewsDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTPInput />} />
          <Route path="/reset/:id" element={<PasswordReset />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/error" element={<Error />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/password-reset-link" element={<PasswordResetLink />} />
          <Route path="/password-reseted" element={<PasswordReseted />} />
          
          <Route element={<ProtectedUserRoutes />}>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user-donations" element={<UserDonations />} />
            <Route path="/user-notifications" element={<UserNotifications />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-messages" element={<UserMessages />} />
          </Route>
          <Route element={<ProtectedFundraiserRoutes />}>
            <Route path="/fundraiser" element={<FundraiserDashboard />} />
            <Route
              path="/fundraiser-notifications"
              element={<FundraiserNotifications />}
            />
            <Route
              path="/fundraiser-projects"
              element={<FundraiserProjects />}
            />
            <Route
              path="/fundraiser-donations"
              element={<FundraiserDonations />}
            />
            <Route
              path="/fundraiser-messages"
              element={<FundraiserMessages />}
            />
            <Route path="/fundraiser-profile" element={<FundraiserProfile />} />
            <Route
              path="/fundraiser-create-project"
              element={<FundraiserCreateProject />}
            />
            <Route
              path="/fundraiser-update/:pid"
              element={<FundraiserUpdateProject />}
            />
            <Route
              path="/fundraiser-details/:pid"
              element={<FundraiserProjectDetails />}
            />
          </Route>
          <Route element={<ProtectedAdminRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-donations" element={<AdminDonations />} />
            <Route path="/admin-fundraiser-details/:pid" element={<AdminFundraiserDetails />} />
            <Route path="/admin-fundraisers" element={<AdminFundraisers />} />
            <Route path="/admin-notifications" element={<AdminNotifications />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/admin-project-details/:pid" element={<AdminProjectDetails />} />
            <Route path="/admin-projects" element={<AdminProjects />} />
            <Route path="/admin-user-details/:pid" element={<AdminUserDetails />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-messages" element={<AdminMessages />} />
            <Route path="/admin-reports" element={<AdminReports />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App

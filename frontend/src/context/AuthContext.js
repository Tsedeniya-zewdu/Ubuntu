import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// To use user informations anywhere in the application
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user') || null),
  )

  // for check verified user
  const [verified, setVerified] = useState(false)
  const [email, setEmail] = useState()
  const [otp, setOTP] = useState()
  const [sentOTP, setSentOTP] = useState()
  const [pendingProjects, setPendingProjects] = useState([])

  const getPendingProjects = async () => {
    // const res = await axios.get('/projects/pending')
    // setPendingProjects(res.data)
  }

  const approvePendingProject = async (input) => {
    if (currentUser.type == 'Super') {
      const res = await axios.get(`/projects/approve2/${input}`, input)
    } else {
      const res = await axios.get(`/projects/approve1/${input}`, input)
    }
  }
  
  const rejectPendingProject = async (input) => {
    if (currentUser.type == 'Super') {
      const res = await axios.get(`/projects/reject2/${input}`, input)
    } else {
      const res = await axios.get(`/projects/reject1/${input}`, input)
    }
  }

  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs)
    setCurrentUser(res.data)
  }

  const register = async (inputs) => {
    const res = await axios.post('/auth/register', inputs)
    setCurrentUser(res.data)
  }

  const navigate = useNavigate()

  const logout = async () => {
    let data = {
      id: currentUser._id,
      role: currentUser.role
    }
    await axios.post('/auth/logout', data)
    setCurrentUser(null)
  }

  const [userNotifications, setUserNotifications] = useState(0)

  const getUserNotifications = async () => {
    let sum = 0
    let data
    if (currentUser.role == 'User') {
      data = {
        login: currentUser.login,
      }
    }

    let res = await axios.post('/notifications/user', data)
    try {
      res.data.forEach((data) => {
        sum++
      })
      setUserNotifications(sum)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const markUserNotificationsAsSeen = async () => {
    setCurrentUser((prevState) => {
      return {
        ...prevState,
        login: new Date(),
      }
    })
  }

  const [fundraiserNotifications, setFundraiserNotifications] = useState(0)

  const getFundraiserNotifications = async () => {
    let sum = 0
    let data
    if (currentUser.role == 'Fundraiser') {
       data = {
        login: currentUser.login,
      }
   }

    let res = await axios.post('/notifications/fundraiser', data)
    try {
      res.data.forEach((data) => {
        sum++
      })
      setFundraiserNotifications(sum)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const [adminNotifications, setAdminNotifications] = useState(0)

  const getAdminNotifications = async () => {
    let sum = 0
    let customPath = ''
    if (currentUser.type == 'Super') {
      customPath = 'admin2'
    } else {
      customPath = 'admin1'
    }
    const res = await axios.get(`/notifications/${customPath}`)
    try {
      res.data.forEach((data) => {
        sum++
      })
      setAdminNotifications(sum)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        approvePendingProject,
        rejectPendingProject,
        getUserNotifications,
        userNotifications,
        markUserNotificationsAsSeen,
        adminNotifications,
        getAdminNotifications,
        getFundraiserNotifications,
        fundraiserNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

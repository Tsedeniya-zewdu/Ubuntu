import React, { useContext, useEffect, useState } from 'react'
import './ProfileStyles.scss'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const UserProfileComp = (props) => {
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState()
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
  })

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const fetchData = async () => {
    let data = {
      user: currentUser._id,
      role: 'User'
    }
    const res = await axios.post('/users/user', data)
    setUser(res.data)
    if (user) {
      setInputs({
        name: currentUser.name,
        email: currentUser.email,
      })
    }
    try {
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleImageDelete = async () => {
  let data = {
      user: currentUser._id,
      role: 'User'
    }
    let res = await axios.patch('/users/profile/delete', data)
    try {
      fetchData()
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleImageChange = async (e) => {
    let image = e.target.files[0]
    let formData = new FormData()
    formData.append('user', currentUser._id)
    formData.append('profile', image)
    formData.append('role', 'User')
    console.log('Form Data: ', formData.get('profile'))
    let res = await axios.post('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    try {
      fetchData()
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSave = async () => {
   
  }

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <Card className="profile-picture">
          <div className="img-text-wrapper">
            <Typography variant="h6" className="title">
              Profile Picture
            </Typography>
            <Link
              to={
                user && user.image != ''
                  ? `http://localhost:5000/api/uploads/${user.image}`
                  : 'profile-icon.png'
              }
            >
              <img
                src={
                  user && user.image != ''
                    ? `http://localhost:5000/api/uploads/${user.image}`
                    : 'profile-icon.png'
                }
                alt="profile pic"
              />
            </Link>{' '}
          </div>
          <div className="texts">
            <Button
              sx={{
                position: 'relative',
                '> input': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  opacity: '0',
                  cursor: 'pointer',
                },
              }}
            >
              Change Profile{' '}
              <input
                onChange={handleImageChange}
                id="image-input"
                // hidden
                accept="image/*"
                type="file"
                name="profile"
              />
            </Button>
            <Button onClick={handleImageDelete}>Remove Profile</Button>
          </div>
        </Card>
        <Card className="basic-info">
          <Typography variant="h6" className="title">
            Basic information
          </Typography>
          <div className="text-field-wrapper">
            <TextField onChange={handleChange} value={inputs.name} label="Name" name="name" />
            <TextField onChange={handleChange} value={inputs.email} label="Email" name="email" />
          </div>
        </Card>
      </div>
      <Box
        className="btn-wrapper"
        sx={{
          mt: { xs: '20px', sm: '30px', md: '40px' },
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleSave} className="save" variant="contained">
          Update
        </Button>
        <Button
          className="cancel"
          variant="contained"
          onClick={() => navigate('/user')}
        >
          Cancel
        </Button>
      </Box>
    </div>
  )
}

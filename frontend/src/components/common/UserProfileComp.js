import React, { useContext, useEffect, useState } from 'react'
import './ProfileStyles.scss'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const UserProfileComp = (props) => {
  const navigate = useNavigate()

  const {t} = useTranslation()

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
             {t('user:profile.1')}
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
              {t('user:profile.2')}{' '}
              <input
                onChange={handleImageChange}
                id="image-input"
                // hidden
                accept="image/*"
                type="file"
                name="profile"
              />
            </Button>
            <Button onClick={handleImageDelete}>{t('user:profile.3')}</Button>
          </div>
        </Card>
        <Card className="basic-info">
          <Typography variant="h6" className="title">
            {t('user:profile.4')}
          </Typography>
          <div className="text-field-wrapper">
            <TextField onChange={handleChange} value={inputs.name} label={t('user:profile.5')} name="name" />
            <TextField onChange={handleChange} value={inputs.email} label={t('user:profile.6')} name="email" />
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
          {t('btn.2')}
        </Button>
        <Button
          className="cancel"
          variant="contained"
          onClick={() => navigate('/user')}
        >
          {t('btn.3')}
        </Button>
      </Box>
    </div>
  )
}

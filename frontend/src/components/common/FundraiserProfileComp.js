import React, { useContext, useEffect, useState } from 'react'
import './ProfileStyles.scss'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const FundraiserProfileComp = (props) => {
  const navigate = useNavigate()

  const {t} = useTranslation()
  
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState()
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
  })

  const fetchData = async () => {
    let data = {
      user: currentUser._id,
      role: 'Fundraiser'
    }
    const res = await axios.post('/users/user', data)
    setUser(res.data)
    if (user) {
      setInputs({
        name: user.name,
        email: user.email,
      })
    }
    try {
    } catch (err) {
      console.log(err)
    }
  }


  let image
  let formData = new FormData()
  formData.append('user', currentUser._id)

  const handleImageChange = async (e) => {
    image = e.target.files[0]
    console.log(image)
    formData.append('profile', image)
    formData.append('role', 'Fundraiser')
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

  const handleImageDelete = async () => {
    let data = {
      user: currentUser._id,
      role: 'Fundraiser'
    }
    let res = await axios.patch('/users/profile/delete', data)
    try {
      fetchData()
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSave = async () => {}

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <Card className="profile-picture">
          <div className="img-text-wrapper">
            <Typography variant="h6" className="title">
             {t('fundraiser:profile.1')}
            </Typography>
            <Link
              to={
                user && user.image != ''
                  ? `http://localhost:5000/api/uploads/${user.image}`
                  : ''
              }
            >
              <img
                src={
                  user && user.image != ''
                    ? `http://localhost:5000/api/uploads/${user.image}`
                    : props.img
                }
                alt="profile pic"
              />
            </Link>
          </div>
          <div className="texts">
            <Button  sx={{
                position: 'relative',
                '> input': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  opacity: '0',
                  cursor: 'pointer',
                },
              }}>{t('fundraiser:profile.2')}
            <input
                onChange={handleImageChange}
                id="image-input"
                // hidden
                accept="image/*"
                type="file"
                name="profile"
              />
            </Button>
            <Button onClick={handleImageDelete}>{t('fundraiser:profile.3')}</Button>
          </div>
        </Card>
        <Card className="basic-info">
          <Typography variant="h6" className="title">
            {t('fundraiser:profile.4')}
          </Typography>
          <div className="text-field-wrapper">
            <TextField value={inputs.name} label={t('fundraiser:profile.5')} name="name" />
            <TextField value={inputs.email} label={t('fundraiser:profile.6')} name="email" />
            <TextField label={t('fundraiser:profile.7')} name="phone" />
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
          onClick={() => navigate('/fundraiser')}
        >
          {t('btn.3')}
        </Button>
      </Box>
    </div>
  )
}

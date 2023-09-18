import React, { useContext, useEffect, useState } from 'react'
import './ProfileStyles.scss'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const FundraiserProfileComp = (props) => {
  const navigate = useNavigate()

  
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
              Profile Picture
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
              }}>Change Profile
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
            <TextField value={inputs.name} label="Name" name="name" />
            <TextField value={inputs.email} label="Email" name="email" />
            <TextField label="Phone" name="phone" />
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
          Save
        </Button>
        <Button
          className="cancel"
          variant="contained"
          onClick={() => navigate('/fundraiser')}
        >
          Cancel
        </Button>
      </Box>
    </div>
  )
}

import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import AddIcon from '@mui/icons-material/Add'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export const CreateNewsForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    amount: '',
    deadline: '',
  })
  const [story, setStory] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedImagesFileNames, setUploadedImagesFileNames] = useState([])
  const [uploadedDocs, setUploadedDocs] = useState([])
  const [uploadedDocsFilenames, setUploadedDocsFilenames] = useState([])
  const [uploadedVideo, setUploadedVideo] = useState([])
  const [uploadedVideoName, setUploadedVideoName] = useState()
  const [category, setCategory] = useState('')

  const navigate = useNavigate()

  const {t} = useTranslation()

  // get current fundraiser
  const { currentUser } = useContext(AuthContext)

  // Get input category and put it on state
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }
  // Get user input images and put them on array
  const handleImageEvent = (e) => {
    const chosenImages = Array.prototype.slice.call(e.target.files)
    handleUploadImages(chosenImages)
  }
  // store images on state
  const handleUploadImages = (files) => {
    const uploaded = [...uploadedImages]
    files.forEach((file) => {
      // check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setUploadedImages(uploaded)
  }

  // Get user input documents and put them on array
  const handleDocEvent = (e) => {
    const chosenDoc = Array.prototype.slice.call(e.target.files)
    handleUploadDocs(chosenDoc)
  }
  // store documents on state
  const handleUploadDocs = (files) => {
    const uploaded = [...uploadedDocs]
    files.forEach((file) => {
      // check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setUploadedDocs(uploaded)
  }

  // get user video input and put it on array
  const handleVideoEvent = (e) => {
    const chosenVideo = Array.prototype.slice.call(e.target.files)
    handleUploadVideo(chosenVideo)
  }
  // store video on state
  const handleUploadVideo = (files) => {
    const uploaded = [...uploadedVideo]
    files.forEach((file) => {
      uploaded.push(file)
    })
    setUploadedVideo(uploaded)
  }

  // Collecting inputs data and store them on state
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // get all user input data and send to backend
  const handleSave = async (e) => {
    e.preventDefault()

    let fileNames = []
    uploadedImages.map((data) => {
      fileNames.push(data.name)
    })
    setUploadedImagesFileNames(fileNames)

    let raisedCalculated = 0

    let formData = new FormData()

    formData.append('title', inputs.title)
    formData.append('desc', inputs.desc)
    formData.append('story', story)
    formData.append('amount', inputs.amount)
    formData.append('deadline', inputs.deadline)
    formData.append('raised', raisedCalculated)
    formData.append('category', category)
    formData.append('fundraiser', currentUser._id)

    if (uploadedImages) {
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append('img', uploadedImages[i])
        console.log(formData.get('img'))
      }
    }

    if (uploadedVideo) {
      formData.append('vid', uploadedVideo[0])
    }

    if (uploadedDocs) {
      for (let i = 0; i < uploadedDocs.length; i++) {
        formData.append('doc', uploadedDocs[i])
        console.log(formData.get('doc'))
      }
    }

    await axios
      .post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        // Reset form
        document.getElementById('create-project-form').reset()
        setUploadedImages([])
        setUploadedVideo([])
        setUploadedDocs([])
        setCategory('')
        setStory('')
        navigate('/fundraiser-projects')
      })
  }

  const handleImageDelete = (idx) => {
    const newImages = uploadedImages.filter((item, pos, self) => {
      return self.indexOf(item) != idx
    })
    setUploadedImages(newImages)
  }

  const handleDocDelete = (idx) => {
    const newDocs = uploadedDocs.filter((item, pos, self) => {
      return self.indexOf(item) != idx
    })
    setUploadedDocs(newDocs)
  }

  const handleVideoDelete = () => {
    setUploadedVideo([])
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: '16px',
        pt: { xs: '60px', md: '110px' },
        pb: { xs: '60px', md: '110px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
        }}
      >
        <Box sx={{ width: { xs: '100%' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: { xs: '20px', sm: '30px', md: '40px' } }}>
              <Button
                onClick={() => navigate('/fundraiser-projects')}
                variant="contained"
                sx={{
                  background: 'gray',
                  mb: '20px',
                  maxWidth: '100px',
                  textTransform: 'none',
                  '&:hover': { background: 'gray' },
                }}
                startIcon={<ArrowBackIcon />}
              >
                {t('btn.1')}
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: '26px',
                fontWeight: '700',
                color: '#1f2230',
                pb: { xs: '20px' },
              }}
            >
              {t('title.10')}
            </Typography>
          </Box>
          <form id="create-project-form">
            <Box>
              {/* Project Title and Catagory */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: '20px',
                  mt: '20px',
                  width: '100%',
                  '>*': { width: { xs: '100%', sm: '50%' } },
                }}
              >
                <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                    {t('fundraiser:project.17')}
                  </Typography>
                  <TextField
                    sx={{ size: { xs: 'small', md: 'medium' } }}
                    label= {t('fundraiser:project.17')}
                    name="title"
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                  {t('fundraiser:project.18')}
                  </Typography>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                    {t('fundraiser:project.19')}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label= {t('fundraiser:project.19')}
                      name="category"
                      onChange={handleCategory}
                    >
                      <MenuItem value="Medical">{t('category.1.title')}</MenuItem>
                        <MenuItem value="Children">{t('category.2.title')}</MenuItem>
                        <MenuItem value="Education">{t('category.3.title')}</MenuItem>
                        <MenuItem value="Family">{t('category.4.title')}</MenuItem>
                        <MenuItem value="Disaster">{t('category.5.title')}</MenuItem>
                        <MenuItem value="Other">{t('category.6.title')}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* Goal and Date*/}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: '20px',
                  mt: '20px',
                  width: '100%',
                  '>*': { width: { xs: '100%', sm: '50%' } },
                }}
              >
                <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                  {t('fundraiser:project.20')}
                  </Typography>
                  <TextField
                    sx={{ size: { xs: 'small', md: 'medium' } }}
                    label= {t('fundraiser:project.10')}
                    type="number"
                    name="amount"
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                  {t('fundraiser:project.21')}
                  </Typography>
                  <TextField
                    sx={{ size: { xs: 'small', md: 'medium' } }}
                    type="date"
                    label=""
                    name="deadline"
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* Images and Video */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: '20px',
                  my: '20px',
                  width: '100%',
                  '>*': { width: { xs: '100%', sm: '50%' } },
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                  {t('fundraiser:project.22')}
                  </Typography>

                  {uploadedImages.map((img, idx) => {
                    return (
                      <Card
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          my: '2px',
                          paddingLeft: '10px',
                          py: '5px',
                        }}
                      >
                        <Typography sx={{ width: '90%', overflow: 'hidden' }}>
                          {img.name}
                        </Typography>
                        <Button onClick={() => handleImageDelete(idx)}>
                          <ClearOutlinedIcon />
                        </Button>
                      </Card>
                    )
                  })}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                      p: '7px 15px',
                      color: '#777',
                    }}
                  >
                    <Button
                      variant="text"
                      component="label"
                      startIcon={<AddIcon />}
                    >
                       {t('fundraiser:project.23')}
                      <input
                        onChange={handleImageEvent}
                        id="image-input"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        name="images"
                      />
                    </Button>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                  {t('fundraiser:project.24')}
                  </Typography>
                  {uploadedVideo[0] && (
                    <Card
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        my: '2px',
                        paddingLeft: '10px',
                        py: '5px',
                      }}
                    >
                      <Typography sx={{ width: '90%', overflow: 'hidden' }}>
                        {uploadedVideo[0].name}
                      </Typography>
                      <Button onClick={handleVideoDelete}>
                        <ClearOutlinedIcon />
                      </Button>
                    </Card>
                  )}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                      p: '7px 15px',
                      color: '#777',
                    }}
                  >
                    {!uploadedVideo[0] && (
                      <Button
                        variant="text"
                        component="label"
                        startIcon={<AddIcon />}
                      >
                         {t('fundraiser:project.25')}
                        <input
                          id="video-input"
                          hidden
                          accept="video/*"
                          type="file"
                          name="video"
                          onChange={handleVideoEvent}
                        />
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Box>

              {/* Add Reference documents */}
              <Box>
                <Typography variant="h6" sx={{ mb: '10px' }}>
                {t('fundraiser:project.26')}
                </Typography>

                {uploadedDocs.map((doc, idx) => {
                  return (
                    <Card
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: '2px',
                        paddingLeft: '10px',
                        py: '5px',
                      }}
                    >
                      <Typography sx={{ width: '90%', overflow: 'hidden' }}>
                        {doc.name}
                      </Typography>
                      <Button onClick={() => handleDocDelete(idx)}>
                        <ClearOutlinedIcon />
                      </Button>
                    </Card>
                  )
                })}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{
                    p: '7px 15px',
                    color: '#777',
                  }}
                >
                  <Button
                    variant="text"
                    component="label"
                    startIcon={<AddIcon />}
                  >
                     {t('fundraiser:project.27')}
                    <input
                      onChange={handleDocEvent}
                      id="document-input"
                      hidden
                      accept="*"
                      multiple
                      type="file"
                      name="docs"
                    />
                  </Button>
                </Stack>
              </Box>

              {/* Short Story */}
              <Box>
                <Typography variant="h6" sx={{ mb: '10px' }}>
                {t('fundraiser:project.28')}
                </Typography>
                <TextField
                  rows={2}
                  multiline={true}
                  label="Short Story"
                  sx={{ width: '100%', mb: '20px' }}
                  name="desc"
                  onChange={handleChange}
                />
              </Box>

              {/* Detail Story */}
              <Box
                sx={{
                  width: '100%',
                  my: '20px',
                  '.ql-editor ': { minHeight: '250px' },
                }}
              >
                <Typography variant="h6" sx={{ mb: '10px' }}>
                {t('fundraiser:project.29')}
                </Typography>
                <ReactQuill theme="snow" value={story} onChange={setStory} />
              </Box>

              {/* Button */}
              <Box
                sx={{
                  mt: { xs: '20px', sm: '30px', md: '40px' },
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '16px',
                    minWidth: '84px',
                  }}
                  onClick={handleSave}
                >
                  {t('btn.7')}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '16px',
                    minWidth: '84px',
                  }}
                  onClick={() => navigate('/fundraiser-projects')}
                >
                  {t('btn.3')}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

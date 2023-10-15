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
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import AddIcon from '@mui/icons-material/Add'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export const UpdateNewsForm = () => {
  const { pid } = useParams()
  const [project, setProject] = useState()
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    amount: null,
    released: '',
    raised: null,
    cost1: null,
    cost2: null,
    given: null,
  })
  const [story, setStory] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [imagesFromInput, setImagesFromInput] = useState([])
  const [imagesFromDB, setImagesFromDB] = useState([])
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState([])
  const [uploadedVideo, setUploadedVideo] = useState([])
  const [videoFromDB, setVideoFromDB] = useState()
  const [videoToBeDeleted, setVideoToBeDeleted] = useState()
  const [arr2, setArr2] = useState([])
  const [showNews, setShowNews] = useState('Visible')

  const { t } = useTranslation()

  // TESTING VAR
  let videoFromDataBase = ''
  let imagesFromDataBase = []

  // Get a project data from db
  useEffect(() => {
    const fetchData = async () => {
      // console.log(pid)

      await axios.get(`/projects/project/${pid}`).then((res) => {
        setProject(res.data[0])
        // console.log(res.data)
        setImagesFromDB(res.data[0].newsimages)
        setVideoFromDB(res.data[0].newsvideo)
        setUploadedImages(res.data[0].newsimages)
        setUploadedVideo(res.data[0].newsvideo)
        setInputs({
          title: res.data[0].title,
          desc: res.data[0].newsdesc,
          amount: res.data[0].amount,
          released: Date.now(),
          raised: res.data[0].raised,
          cost1: (res.data[0].raised * (15 / 1000)).toFixed(2),
          cost2: (res.data[0].raised * (35 / 1000)).toFixed(2),
          given: (
            res.data[0].raised -
            ((res.data[0].raised * 15) / 1000 +
              (res.data[0].raised * 35) / 1000)
          ).toFixed(2),
        })
        setShowNews(res.data[0].news)
        setStory(res.data[0].newsdetail)
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    
    const fetchData = async () => {
      let res = await axios.get(`/projects/completed/${pid}`)
      try {
        setArr2(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  // console.log(arr2)

  if (project) {
    videoFromDataBase = videoFromDB
    imagesFromDataBase = imagesFromDB
  }
  const navigate = useNavigate()

  // get current fundraiser
  const { currentUser } = useContext(AuthContext)

  // Get user input images and put them on array
  const handleImageEvent = (e) => {
    const chosenImages = Array.prototype.slice.call(e.target.files)
    handleUploadImages(chosenImages)
  }
  // store images on state
  const handleUploadImages = (files) => {
    const uploaded = [...imagesFromInput]

    files.forEach((file) => {
      // check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setImagesFromInput(uploaded)
    setUploadedImages([...imagesFromDB, ...uploaded])
  }

  // get user video input and put it on array
  const handleVideoEvent = (e) => {
    const chosenVideo = Array.prototype.slice.call(e.target.files)
    setUploadedVideo(chosenVideo)
    console.log('Uploaded Video: ', uploadedVideo)
  }

  // Collecting inputs data and store them on state
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // get all user input data and send to backend
  const handleSave = async (e) => {
    e.preventDefault()

    // FOR DELETING FILES

    const formData2 = {
      images: imagesToBeDeleted,
      video: videoToBeDeleted,
    }

    const res2 = await axios.post('/projects/delete', formData2)
    try {
      console.log('Deleted Files: ')
      console.log('Images: ', res2.data.images)
      console.log('Video: ', res2.data.video)
    } catch (err) {
      console.log(err)
    }

    // FOR UPLOADING NEWLY ADDED FILES
    let formData1 = new FormData()
    if (imagesFromInput) {
      for (let i = 0; i < imagesFromInput.length; i++) {
        formData1.append('img', imagesFromInput[i])
        console.log(formData1.get('img'))
      }
    }

    if (uploadedVideo) {
      if (uploadedVideo[0] != 'string') {
        formData1.append('vid', uploadedVideo[0])
        console.log(formData1.get('vid'))
      }
    }

    let res = await axios.post('/projects/upload', formData1, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    try {
      if (res.data.video !== '') {
        videoFromDataBase = res.data.video
      }
      if (res.data.images !== []) {
        res.data.images.forEach((img) => {
          imagesFromDataBase.push(img)
        })
      }
    } catch (err) {
      console.log(err)
    }

    let formData = {
      newsimages: imagesFromDataBase,
      newsvideo: videoFromDataBase,
      newsdesc: inputs.desc,
      newsdetail: story,
      released: Date.now(),
      cost1: inputs.cost1,
      cost2: inputs.cost2,
      given: inputs.given,
      donations: arr2,
    }
    console.log(arr2)

    await axios.put(`/projects/news/${pid}`, formData).then(() => {
      navigate(`/news/${pid}`)
    })
  }

  const handleImageDelete = (img) => {
    setImagesToBeDeleted((current) => [...current, img])
    setImagesFromDB((current) => current.filter((data) => data !== img))
    setImagesFromInput((current) => current.filter((data) => data !== img))
    setUploadedImages((current) => current.filter((data) => data !== img))
  }

  const handleVideoDelete = () => {
    setVideoToBeDeleted(videoFromDB)
    setUploadedVideo(null)
    setVideoFromDB('')
    // console.log('From delete: ', uploadedVideo)
  }

  const showOrHideNews = async () => {

    if (project && project.news != 'Visible') {
      let res = await axios.get(`/projects/show/${pid}`)
      setShowNews(res.data.news)
    } else {
      let res = await axios.get(`/projects/hide/${pid}`)
      setShowNews(res.data.news)
    }
    window.location.reload()
  }
  // console.log(project)

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
          {/* top title and buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                mb: {
                  xs: '20px',
                  sm: '30px',
                  md: '40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                },
              }}
            >
              <Button
                onClick={() => navigate('/admin-news')}
                variant="contained"
                sx={{
                  background: 'gray',
                  mb: '20px',
                  maxWidth: '100px',
                  minWidth: '100px',
                  textTransform: 'none',
                  '&:hover': { background: 'gray' },
                }}
                startIcon={<ArrowBackIcon />}
              >
                {t('btn.1')}
              </Button>
              <Button
                // onClick={handleDeleteProject}
                variant="contained"
                onClick={showOrHideNews}
                sx={{
                  background: 'gray',
                  mb: '20px',
                  maxWidth: '100px',
                  minWidth: '100px',
                  textTransform: 'none',
                  // '&:hover': { background: 'red' },
                }}
              >
                {showNews == 'Visible' ? 'Hide' : 'Show'}
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
              {t('title.11')}
            </Typography>
          </Box>

          {project && (
            <form id="create-project-form">
              <Box>
                {/* Project Title and Goal */}
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
                      label={t('fundraiser:project.17')}
                      name="title"
                      value={inputs.title}
                      // onChange={handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                  <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      {t('fundraiser:project.10')}
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label={t('fundraiser:project.10')}
                      name="title"
                      value={inputs.amount}
                      // onChange={handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                </Box>
                {/* Raised and Given*/}
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
                      {t('fundraiser:project.30')}
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label={t('fundraiser:project.30')}
                      type="number"
                      name="amount"
                      value={inputs.raised}
                      // onChange={handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                  <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      {t('fundraiser:project.33')}
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label={t('fundraiser:project.33')}
                      type="number"
                      name="amount"
                      value={inputs.raised - inputs.cost1 - inputs.cost2}
                      inputProps={{ readOnly: true }}
                      // onChange={handleChange}
                    />
                  </Box>
                </Box>
                {/* Opration and Transactions costs */}
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
                      {t('fundraiser:project.31')}
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label={t('fundraiser:project.31')}
                      name="title"
                      value={(inputs.raised * 35) / 1000}
                      // onChange={handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                  <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      {t('fundraiser:project.32')}
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label={t('fundraiser:project.32')}
                      name="title"
                      value={(inputs.raised * 15) / 1000}
                      // onChange={handleChange}
                      inputProps={{ readOnly: true }}
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
                      {t('fundraiser:project.34')}
                    </Typography>
                    {uploadedImages &&
                      uploadedImages.map((img, idx) => {
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
                            <Typography
                              sx={{
                                width: '90%',
                                overflow: 'hidden',
                                a: { color: '#222' },
                              }}
                            >
                              {typeof img == 'string' ? (
                                <a
                                  target="blank"
                                  href={`http://localhost:5000/api/uploads/${img}`}
                                >
                                  {img}
                                </a>
                              ) : (
                                img.name
                              )}
                            </Typography>

                            <Button onClick={() => handleImageDelete(img)}>
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
                        />
                      </Button>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      {t('fundraiser:project.35')}
                    </Typography>
                    {uploadedVideo && (
                      <Card
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          my: '2px',
                          paddingLeft: '10px',
                          py: '5px',
                        }}
                      >
                        <Typography
                          sx={{
                            width: '90%',
                            overflow: 'hidden',
                            a: { color: '#222' },
                          }}
                        >
                          {typeof uploadedVideo[0] == 'string' ? (
                            <a
                              target="blank"
                              href={`http://localhost:5000/api/uploads/${uploadedVideo}`}
                            >
                              {' '}
                              {uploadedVideo}
                            </a>
                          ) : (
                            uploadedVideo[0].name
                          )}
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
                      {!uploadedVideo && (
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

                {/* Short Story */}
                <Box>
                  <Typography variant="h6" sx={{ mb: '10px' }}>
                    {t('fundraiser:project.36')}
                  </Typography>
                  <TextField
                    rows={2}
                    multiline={true}
                    label="Short Story"
                    sx={{ width: '100%', mb: '20px' }}
                    name="desc"
                    value={inputs.desc}
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
                    {t('fundraiser:project.37')}
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
                    onClick={() => navigate('/admin-news')}
                  >
                    {t('btn.3')}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  )
}

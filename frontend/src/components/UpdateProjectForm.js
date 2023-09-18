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
import { AuthContext } from './../context/AuthContext'

export const UpdateProjectForm = () => {
  const { pid } = useParams()
  const [project, setProject] = useState()
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    amount: null,
    deadline: null,
    raised: null
  })
  const [story, setStory] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [imagesFromInput, setImagesFromInput] = useState([])
  const [imagesFromDB, setImagesFromDB] = useState([])
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState([])
  const [uploadedDocs, setUploadedDocs] = useState([])
  const [docsFromDB, setDocsFromDB] = useState([])
  const [docsToBeDeleted, setDocsToBeDeleted] = useState([])
  const [docsFromInput, setDocsFromInput] = useState([])
  const [uploadedVideo, setUploadedVideo] = useState([])
  const [videoFromDB, setVideoFromDB] = useState()
  const [videoToBeDeleted, setVideoToBeDeleted] = useState()
  const [category, setCategory] = useState('')

  // TESTING VAR
  let videoFromDataBase = ''
  let imagesFromDataBase = []
  let docsFromDatabase = []

  // Get a project data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/projects/project/${pid}`)
        setProject(res.data[0])
        console.log(res.data)
        setImagesFromDB(res.data[0].images)
        setDocsFromDB(res.data[0].docs)
        setVideoFromDB(res.data[0].video)
        setUploadedImages(res.data[0].images)
        setUploadedVideo(res.data[0].video)
        setUploadedDocs(res.data[0].docs)
        setInputs({
          title: res.data[0].title,
          desc: res.data[0].desc,
          amount: res.data[0].amount,
          deadline: res.data[0].deadline,
          raised: res.data[0].raised
        })
        setCategory(res.data[0].category)
        setStory(res.data[0].story)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  if (project) {
    videoFromDataBase = videoFromDB
    imagesFromDataBase = imagesFromDB
    docsFromDatabase = docsFromDB
    // console.log('From use effect')
    // console.log(videoFromDataBase)
    // console.log(imagesFromDataBase)
    // console.log(docsFromDatabase)
  }
  const navigate = useNavigate()

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
    const uploaded = [...imagesFromInput]

    files.forEach((file) => {
      // check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setImagesFromInput(uploaded)
    setUploadedImages([...imagesFromDB, ...uploaded])
    // console.log('from handle upload')
    // console.log('To be deleted: ', imagesToBeDeleted)
    // console.log('From Database: ', imagesFromDB)
    // console.log('From Input: ', imagesFromInput)
    // console.log('To be uploaded: ', uploadedImages)
  }

  // Get user input documents and put them on array
  const handleDocEvent = (e) => {
    const chosenDoc = Array.prototype.slice.call(e.target.files)
    handleUploadDocs(chosenDoc)
  }
  // store documents on state
  const handleUploadDocs = (files) => {
    const uploaded = [...docsFromInput]
    files.forEach((file) => {
      // check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setDocsFromInput(uploaded)
    setUploadedDocs([...docsFromDB, ...uploaded])
    // console.log('from handle upload')
    // console.log('To be deleted: ', docsToBeDeleted)
    // console.log('From Database: ', docsFromDB)
    // console.log('From Input: ', docsFromDB)
    // console.log('To be uploaded: ', uploadedDocs)
  }

  // Changing Date format
  let dateObj = new Date(inputs.deadline)
  let year = dateObj.getUTCFullYear()
  let month = dateObj.getUTCMonth() + 1
  let date = dateObj.getUTCDate()
  let materialDateInput = `${year}-${month}-${date}`

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

  let raisedCalculated = inputs.raised

  // get all user input data and send to backend
  const handleSave = async (e) => {
    e.preventDefault()

    // FOR DELETING FILES

    const formData2 = {
      images: imagesToBeDeleted,
      video: videoToBeDeleted,
      docs: docsToBeDeleted,
    }

    const res2 = await axios.post('/projects/delete', formData2)
    try {
      console.log('Deleted Files: ')
      console.log('Images: ', res2.data.images)
      console.log('Video: ', res2.data.video)
      console.log('Documents: ', res2.data.docs)
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

    if (docsFromInput) {
      for (let i = 0; i < docsFromInput.length; i++) {
        formData1.append('doc', docsFromInput[i])
        console.log(formData1.get('doc'))
      }
    }

    let res = await axios.post('/projects/upload', formData1, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    try {
      //   console.log('New Files: ')
      //   console.log('Images: ', res.data.images)
      //   console.log('Video: ', res.data.video)
      //   console.log('Documents: ', res.data.docs)
      // setDocsFromDB((current) => [...current, res.data.docs])
      // setImagesFromDB((current) => [...current, res.data.images])
      // setVideoFromDB(res.data.video)
      if (res.data.video !== '') {
        videoFromDataBase = res.data.video
      }
      if (res.data.images !== []) {
        res.data.images.forEach((img) => {
          imagesFromDataBase.push(img)
        })
      }
      if (res.data.docs !== []) {
        res.data.docs.forEach((doc) => {
          docsFromDatabase.push(doc)
        })
      }
    //   console.log('From handle save')
    //   console.log(videoFromDataBase)
    //   console.log(imagesFromDataBase)
    //   console.log(docsFromDatabase)
    //   console.log('From handle save res.data')
    //   console.log(res.data)
    } catch (err) {
      console.log(err)
    }

    let formData = {
      images: imagesFromDataBase,
      video: videoFromDataBase,
      docs: docsFromDatabase,
      title: inputs.title,
      desc: inputs.desc,
      story: story,
      amount: inputs.amount,
      deadline: inputs.deadline,
      raised: raisedCalculated,
      category: category,
      fundraiser: currentUser._id,
    }

    // console.log('Data to be sent to database')
    // console.log(formData)

      await axios.patch(`/projects/${pid}`, formData).then(() => {
        navigate(`/fundraiser-details/${pid}`)
      })

    // console.log('Files to added to database: ')
    // console.log('Images: ', imagesFromDB)
    // console.log('Video: ', videoFromDB)
    // console.log('Documents: ', docsFromDB)
  }

  const handleImageDelete = (img) => {
    setImagesToBeDeleted((current) => [...current, img])
    setImagesFromDB((current) => current.filter((data) => data !== img))
    setImagesFromInput((current) => current.filter((data) => data !== img))
    setUploadedImages((current) => current.filter((data) => data !== img))
    // console.log('From handle delete')
    // console.log('To be deleted: ', imagesToBeDeleted)
    // console.log('From Database: ', imagesFromDB)
    // console.log('From Input: ', imagesFromInput)
    // console.log('To be uploaded: ', uploadedImages)
  }

  const handleDocDelete = (doc) => {
    setDocsToBeDeleted((current) => [...current, doc])
    setDocsFromDB((current) => current.filter((data) => data !== doc))
    setUploadedDocs((current) => current.filter((data) => data !== doc))
    setDocsFromInput((current) => current.filter((data) => data !== doc))
    // console.log('From handle delete')
    // console.log('To be deleted: ', docsToBeDeleted)
    // console.log('From Database: ', docsFromDB)
    // console.log('From Input: ', docsFromInput)
    // console.log('To be uploaded: ', uploadedDocs)
  }

  const handleVideoDelete = () => {
    setVideoToBeDeleted(videoFromDB)
    setUploadedVideo(null)
    setVideoFromDB('')
    // console.log('From delete: ', uploadedVideo)
  }

  const handleDeleteProject = async () => {
      await axios.delete(`/projects/${pid}`)
      navigate('/fundraiser-projects')
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
            <Box sx={{ mb: { xs: '20px', sm: '30px', md: '40px', display: 'flex', justifyContent: 'space-between' } }}>
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
                Back
              </Button>
              <Button
                onClick={handleDeleteProject}
                variant="contained"
                sx={{
                  background: 'gray',
                  mb: '20px',
                  maxWidth: '100px',
                  textTransform: 'none',
                  '&:hover': { background: 'red' },
                }}
              >
                Delete
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
              Update Project
            </Typography>
          </Box>
          {project && (
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
                      Project title
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label="Project Title"
                      name="title"
                      value={inputs.title}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      Project Catagory
                    </Typography>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Select Category"
                        name="category"
                        onChange={handleCategory}
                      >
                        <MenuItem value="Medical">Medical</MenuItem>
                        <MenuItem value="Children">Children</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Family">Family</MenuItem>
                        <MenuItem value="Disaster">Disaster</MenuItem>
                        <MenuItem value="Wildlife">Wildlife</MenuItem>
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
                      Amount needed
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      label="Goal"
                      type="number"
                      name="amount"
                      value={inputs.amount}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ '>*': { width: { xs: '100%' } } }}>
                    <Typography variant="h6" sx={{ mb: '10px' }}>
                      Deadline
                    </Typography>
                    <TextField
                      sx={{ size: { xs: 'small', md: 'medium' } }}
                      type="date"
                      label=""
                      name="deadline"
                      value={materialDateInput}
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
                      Project images
                    </Typography>
                    {uploadedImages && uploadedImages.map((img, idx) => {
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
                        Add Images
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
                      Project video
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
                          Add Video
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
                    Reference Documents
                  </Typography>

                  {uploadedDocs &&
                    uploadedDocs.map((doc, idx) => {
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
                          <Typography
                            sx={{
                              width: '90%',
                              overflow: 'hidden',
                              a: { color: '#222' },
                            }}
                          >
                            {typeof doc == 'string' ? (
                              <a
                                target="blank"
                                href={`http://localhost:5000/api/uploads/${doc}`}
                              >
                                {doc}
                              </a>
                            ) : (
                              doc.name
                            )}
                          </Typography>
                          <Button onClick={() => handleDocDelete(doc)}>
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
                      Add Documents
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
                    Project Short Story
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
                    Project Detail Story
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
                    Save
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
                    Cancel
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

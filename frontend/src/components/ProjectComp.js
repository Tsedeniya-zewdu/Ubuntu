import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomCard } from './CustomCard'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export const ProjectComp = (props) => {
  const { cid } = useParams()
  const navigate = useNavigate()
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const open1 = Boolean(anchorEl1)
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget)
  }
  const handleClose1 = () => {
    setAnchorEl1(null)
  }
  const [projects, setProjects] = useState([])
  const [category, setCategory] = useState('All')
  const [counter, setCounter] = useState(0)
  const [pageCounter, setPageCounter] = useState(1)

  const {t} = useTranslation()

  const handleChange = (event) => {
    setCategory(event.target.value)
    // handleCategory(category)
    navigate(`/project/${event.target.value}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      
      if (cid == 'All') {
        let res = await axios.get('/projects')
        try {
          setProjects(res.data)
          // navigate(`/project/All`)
        } catch (err) {
          console.log(err)
        }
      } else {
        let res = await axios.get(`/projects/category/${cid}`)
        try {
          setProjects(res.data)
          navigate(`/project/${cid}`)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [cid])

  useEffect(() => {
    setCounter(projects.length)
    let page = (projects.length / 6 > 1) ?  (projects.length) / 6 : 1
    setPageCounter(page)
  },[projects])


  return (
    <Box 
      sx={{
        width: '100%',
        px: '16px',
        display: 'flex',
        justifyContent: 'center',
        pb: { xs: '60px', md: '110px' },
      }}
    >
      <Box className='project-comp' sx={{ maxWidth: 'lg', width: '100%' }}>
        {/* Search and Catagory bar */}
        <Box 
          sx={{
            // height: '100px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            px: '20px',
            py: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            mt: '10px',
            
            backgroundColor: '#fff',
          }}
        >
          {/* Select Catagory */}
          <Box className='project-category-dropdown'
            sx={{
              pr: '20px',
              '>*': { width: { xs: '100%' } },
              minWidth: '250px',
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label=""
                onChange={handleChange}
                variant="standard"
                displayEmpty
                disableUnderline={true}
              >
                <MenuItem value="All" selected>
                {t('project:category.1')}
                </MenuItem>
                <MenuItem value="Medical">{t('project:category.2')}</MenuItem>
                <MenuItem value="Children">{t('project:category.3')}</MenuItem>
                <MenuItem value="Education">{t('project:category.4')}</MenuItem>
                <MenuItem value="Family">{t('project:category.5')}</MenuItem>
                <MenuItem value="Disaster">{t('project:category.6')}</MenuItem>
                <MenuItem value="Other">{t('project:category.7')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          {/* Find Project */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',

              borderLeft: { xs: 'none', md: '1px solid #bdbdbd' },
              //   borderRadius: '50px',
              borderTop: { xs: '1px solid #fffdbd', md: 'none' },
              pr: '10px',
              width: '100%',
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                py: '5px',
                // px: '10px',
                pl: { md: '20px' },
                color: 'black',
              }}
              placeholder={t('project:category.9')}
              inputProps={{ 'aria-label': t('project:category.9') }}
            />
            <IconButton>
              <SearchIcon
                sx={{
                  width: '25px',
                  height: '25px',
                  color: '#02a95b',
                  cursor: 'pointer',
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {/* Total projects and Sort By */}
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'left', sm: 'center' },
            gap: '20px',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            pt: { xs: '20px', sm: '30px', md: '60px' },
          }}
        >
          {/* Total Projects */}
          <Typography>
            <span>{counter}</span> {t('project:category.8')}
          </Typography>
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            {/* Sort */}
            <Box
              id="demo-customized-button"
              aria-controls={open1 ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              variant="contained"
              onClick={handleClick1}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              {/* <Button
                sx={{
                  px: { xs: 'auto', sm: '20px' },
                  color: '#999ca5',
                  textTransform: 'capitalize',
                  border: '1px solid #999ca5',
                  borderRadius: '5px',
                  width: { xs: '100%', sm: 'auto' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>Newest</span> <KeyboardArrowDownIcon />
              </Button> */}
            </Box>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl1}
              open={open1}
              onClose={handleClose1}
            >
              <MenuItem onClick={handleClose1} disableRipple>
                Newest
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose1} disableRipple>
                Oldest
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Project Cards */}
        <Grid
          container
          spacing={2}
          sx={{
            rowGap: { xs: '20px', md: '30px' },
            pt: { xs: '20px', sm: '30px', md: '40px' },
          }}
        >
          {projects &&
            projects.map((project, idx) => {
              let progress = parseFloat(
                (project.raised / project.amount) * 100,
              ).toFixed(2)
              let dateNow = new Date()
              let dateObj = new Date(project.deadline)
              let daysLeft = Math.floor(
                (Date.parse(dateObj) - Date.parse(dateNow)) /
                  (1000 * 60 * 60 * 24),
              )
              return (
                <Grid
                  key={idx}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ a: { textDecoration: 'none' } }}
                >
                  <CustomCard
                    catagory={project.catagory}
                    title={project.title}
                    name={project.details[0].name}
                    avatar={project.details[0].image}
                    img={project.images[0]}
                    days={daysLeft}
                    desc={project.desc}
                    raised={project.raised}
                    percent={progress}
                    goal={project.amount}
                    path={project._id}
                  />
                </Grid>
              )
            })}
        </Grid>
        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '40px',
          }}
        >
          <Stack spacing={2}>
            <Pagination count={pageCounter} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

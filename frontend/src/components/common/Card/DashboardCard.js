import React, { useContext } from 'react'
import './CardStyles.scss'
import { Button, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
export const DashboardCard = (props) => {
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="dashboard-card">
      <div className="top">
        <div className="top-text">
          <Typography className='text1'>{props.text1}</Typography>
          <Typography className='text2' variant="body2">{props.text2}</Typography>
              </div>
              <div className={`top-img top-img${props.id}`}>
                  <img src={props.img} alt="desc-icon" />
              </div>
      </div>

          <div className="bottom">
              <div className='bottom-text'>
                  <Typography className='text3'>{props.text3}</Typography>
                  <Typography className='text4'>{props.text4}</Typography>
              </div>
              <Button className='card-btn' onClick={()=> navigate(props.path)} variant='contained'><span>{props.btn}</span><ArrowForwardIcon size={8} /></Button>
      </div>
    </div>
  )
}

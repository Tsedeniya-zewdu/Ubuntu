import React from 'react'
import './MessagesComp.scss'
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListSubheader,
    Typography,
    TextField
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

export const MessagesComp = (props) => {
  return (
    <div className="messages-comp-wrapper">
          <div className="left">
        <List className='left-list'>
          <ListSubheader></ListSubheader>
          {props.sender.map((data, idx) => {
            return (
              <ListItem>
                <Button key={idx} className="sender-card">
                  <img src={data.img} alt="img" />{' '}
                  <div className="texts-wrapper">
                    <div className="name-time-wrapper">
                      <Typography className="name">{data.name}</Typography>
                      <Typography className="time">{data.time}</Typography>
                    </div>
                    <Typography className="msg">{data.msg}</Typography>
                  </div>
                </Button>
              </ListItem>
            )
          })}
        </List>
      </div>
          <div className='right'>
          <List className='right-list'>
          <ListSubheader></ListSubheader>
          {props.sender.map((data, idx) => {
            return (
                <ListItem className={data.other ? 'msg-box-wrapper' : 'msg-box-wrapper msg-box-wrapper-right'}>
                    <img src={data.img} alt='img' />
                    <Typography className={data.other ? 'msg-box mov-left' : 'msg-box mov-right'}>{data.msg}</Typography>
                    {/* <div className={data.other? 'triangle-left': 'triangle-right'}></div> */}
              </ListItem>
            )
          })}
                  
              </List>
              <div className='msg-textarea'>
                      <TextField className='msg-textfield' multiline
  rows={2} /> <Button endIcon={<SendIcon/>} variant='contained'>Send</Button>
        </div>
      </div>
    </div>
  )
}

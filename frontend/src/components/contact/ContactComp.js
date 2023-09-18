import React from 'react'
import './ContactComp.scss'
import { Box, Button, TextField, Typography } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import PlaceIcon from '@mui/icons-material/Place'
import { StyledButton } from '../Common'

export const ContactComp = () => {
  return (
    <div className="contact-comp-wrapper">
      <Box maxWidth="lg" className="contact-comp tb-space">
        <div className="top">
          <Typography variant="h2" className="top-title">
            Let's Talk! Reach Out to Us Today
          </Typography>
        </div>
        <div className="contact-info">
          <div className="contact-box">
            <div className="icon-outer">
              <div className="icon email">
                <MailIcon className="icon-inner email-inner" />
              </div>
            </div>
            <div className="contact-box-texts">
              <Typography variant="h3">info@ubuntu.com</Typography>
            </div>
          </div>
          <div className="contact-box">
            <div className="icon-outer">
              <div className="icon phone">
                <PhoneEnabledIcon className="icon-inner phone-inner" />
              </div>
            </div>
            <div className="contact-box-texts">
              <Typography variant="h3">(+251)-123-456-789</Typography>
            </div>
          </div>
          <div className="contact-box">
            <div className="icon-outer">
              <div className="icon address">
                <PlaceIcon className="icon-inner address-inner" />
              </div>
            </div>
            <div className="contact-box-texts">
              <Typography variant="h3">
              Addis Ababa, Ethiopia
              </Typography>
              {/* <Typography variant='h3'>Kyalami Hills Estate,  40 Robin Ave, Midrand Gauteng 1685, 
South Africa</Typography> */}
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="form-top">
            <TextField className="form-name" label="Full name" name="name" />
            <TextField
              className="form-email"
              label="Email address"
              name="email"
            />
          </div>
          <TextField
            className="form-msg"
            label="Message"
            rows={6}
            multiline={true}
            name="msg"
          />
          <StyledButton variant='contained' className="contact-btn">Send Message</StyledButton>
        </div>
        <div className="contact-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.356360776737!2d38.75922877464127!3d9.031219888954967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f0f9a06d85%3A0x4331551f2e0d81cb!2zQUNUIEFtZXJpY2FuIENvbGxlZ2Ugb2YgVGVjaG5vbG9neSB8IDQgS2lsbyB8IOGKoOGKreGJtSDhiqDhiJzhiKrhiqvhipUg4Ym04Yqt4YqW4YiO4YyCIOGKruGIjOGMhSB8IDQg4Yqq4YiO!5e0!3m2!1sen!2set!4v1694788304636!5m2!1sen!2set"></iframe>
        </div>
      </Box>
    </div>
  )
}

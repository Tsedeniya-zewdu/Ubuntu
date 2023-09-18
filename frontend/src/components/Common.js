import { styled, Button, Typography, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

export const StyledButton = styled(Button)({
  borderRadius: '50px',
  padding: '10px 20px',
  fontSize: { xs: '14px', sm: '15px', md: '16px' },
  fontFamily: 'roboto',
  textTransform: 'capitalize',
})

export const StyledTitle1 = styled(Typography)({
  color: '#029a5b',
  fontSize: '16px',
  textTransform: 'uppercase',
  fontWeight: '700',
})

export const StyledTitle2 = styled(Typography)({
  fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' },
  fontWeight: '700',
  color: '#1f2230',
})

export const StyledText1 = styled(Typography)({
  fontSize: '16px',
  fontWeight: '700',
  // color: '#1f2230',
  // paddingLeft: "20px",
  // paddingRight: "20px"
})

export const StyledText2 = styled(Typography)({
  fontSize: '14px',
  fontWeight: '400',
  color: '#5e848e',
})

export const StyledBox1 = styled(Box)({
  padding: '30px 0',
  display: 'flex',
alignItems: "center",
  img: {
    maxWidth: '185px',
    objectFit: 'cover',
    marginRight: '20px',
    marginBottom: "20px"
  },
})

export const StyledBox2 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: '5px',
  marginBottm: '50px',
})

export const StyledIcon1 = styled(CheckIcon)({
  width: '20px',
  height: '20px',
  color: '#029a5b',
  marginRight: '10px',
})

import React from 'react'
import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium} fontWeight="500">
          Create Ad
        </Typography>
      </FlexBetween>
      <img
        src="http://localhost:8001/assets/advert.png"
        alt="Advert"
        width="100%"
        height="auto"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Web Developer</Typography>
        <Typography color={medium}>
          <a
            style={{ textDecoration: 'none', color: { main } }}
            target="_blank"
            href="https://www.fiverr.com/pro_programmer7?up_rollout=true"
          >
            Fiverr.com
          </a>{' '}
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Get your project done using MERN Stack
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget

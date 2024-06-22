import React from 'react'
import { Outlet } from 'react-router-dom'
import { LMSContextProvider } from './LMSContext/LMSContext'

const LMS = () => {
  return (
      <LMSContextProvider>
         <Outlet/>
      </LMSContextProvider>
  )
}

export default LMS
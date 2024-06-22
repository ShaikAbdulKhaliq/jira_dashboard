import React from 'react'
import { Outlet } from 'react-router-dom'
import { ContextProvider } from './Context/SrdpContext';

const MobiusIntelliBoard = () => {
  //add global left side bar
  //top heading bar
  return (
    <ContextProvider>
      <Outlet />
    </ContextProvider>
  )
}

export default MobiusIntelliBoard
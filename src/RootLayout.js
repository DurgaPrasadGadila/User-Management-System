import React from 'react'
import NavigationBar from './components/navigationbar/NavigationBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        {/* navigation bar */}
        <NavigationBar />
        {/* placeholder */}
        <div className='container pt-5'>
        <Outlet />
        </div>
    </div>
  )
}

export default RootLayout
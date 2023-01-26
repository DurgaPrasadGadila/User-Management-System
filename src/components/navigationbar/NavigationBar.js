import React from 'react'
import './NavigationBar.css'
import {NavLink} from 'react-router-dom'
import {FaUsers,FaUsersSlash} from 'react-icons/fa'

function NavigationBar() {

    const activeLink={
        color:"#EEF0F1",
        fontSize: "1.2rem",
        fontWeight:"bold"
    }
    const inactiveLink={
        color:"#EEF0F1",
        fontSize: "1.2rem",
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/1/14/WLM_logo-2.svg" width="50px" alt="" /></a>
      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
    <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" style={({isActive})=>{return isActive ?activeLink:inactiveLink}} to="/users"><FaUsers className='users-icon' /> Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={({isActive})=>{return isActive ?activeLink:inactiveLink}} to="/removed-users"><FaUsersSlash className='removed-users-icon'/> Removed Users</NavLink>
          </li>
          
        </ul>
        
      </div>
    </div>
  </nav>
  )
}

export default NavigationBar
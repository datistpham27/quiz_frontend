import React from 'react'
import Looks3Icon from '@mui/icons-material/Looks3'
import "./style.sass"
import { Link } from 'react-router-dom'

const LogoApp = (props) => {
  return (
    <Link to={"/"} className={"common-link"}>
      <div className='side-left logo-app'>
        <Looks3Icon className="main-logo-app" />
      </div>
    </Link>
  )
}

export default LogoApp
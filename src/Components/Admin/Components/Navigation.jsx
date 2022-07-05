import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
const Navigation = (props) => {
  return (
    <div className="navigation-admin">
        <ToggleLeftSideResponsive setOpenLeftSideResponsive={props?.setOpenLeftSideResponsive}></ToggleLeftSideResponsive>
        <SearchBar></SearchBar>
        <EnterCode text={"Enter code"}></EnterCode>
        <Notifications></Notifications>
    </div>
  )
}

const ToggleLeftSideResponsive= (props)=> {
    return (
        <div className="wkfpskdsfps" onClick={()=> props?.setOpenLeftSideResponsive(prev=> !prev)}>
            <div className="toggle-left-side wrap-icon">
                <MenuIcon></MenuIcon>
            </div>
        </div>
    )
}

const SearchBar= (props)=> {
    return (
        <div className="search-bar-admin">
            <div className="sym-search"><SearchIcon className="search-icon"></SearchIcon></div>
            <input type="text" className="search-bar-admin-inp" placeholder="Search" />
        </div>
    )
}

const EnterCode= (props)=> {
    return (
        <div className="enter-code">
            {props.text}
        </div>
    )
}

const Notifications= (props)=> {
    return (
        <div className="notifications">
            <NotificationsIcon className="notification-1"></NotificationsIcon>
        </div>
    )
}

export default Navigation
import React from 'react'
import Navigation from '../Header/Components/ComponentsLeftSide/Navigation/Navigation'
import NavigationComponent from '../Header/Components/ComponentsLeftSide/Navigation/NavigationComponent'
import SearchIcon from '@mui/icons-material/Search'
import "./style.sass"

const NavigationResponsive = (props) => {
  return (
    <div className="navigation-responsive">
        <div className="wrapper-navigation-responsive">
            <Navigation></Navigation>
            <div className="extend-navigation-component">
                <NavigationComponent icon={<SearchIcon></SearchIcon>} text={"Search"} link="search" ></NavigationComponent>
            </div>
        </div>
    </div>
  )
}

export default NavigationResponsive
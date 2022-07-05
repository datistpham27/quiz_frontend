import React, { useContext } from 'react'
import BriefUser from './Components/BriefUser/BriefUser'
import JoinGameSearch from './Components/JoinGameSearch/JoinGameSearch'
import { Helmet } from "react-helmet-async"
import "./style.sass"
import SearchByTopics from './Components/SearchByTopics/SearchByTopics'
import { UserContext } from '../../App'
// import NavigationResponsive from '../NavigationResponsive/NavigationResponsive'
// import MainTitle from '../Settings/Components/MainTitle'

const Main = (props) => {
  const { user }= useContext(UserContext)
  return (
    <>
      <Helmet>
        <title>Home | Quiz</title>
      </Helmet>
      <div className="main-app max-height">
        <div className="container-1">
          <div className="wrapper-1">
            <JoinGameSearch></JoinGameSearch>
            {
              user?.data?.userLogin &&
              <BriefUser></BriefUser>
            }
          </div>
          <div className="title-search-by-topics">Search by topics</div>
          <SearchByTopics></SearchByTopics>
        </div>
      </div>
    </>
  )
}

export default Main
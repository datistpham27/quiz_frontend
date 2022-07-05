import React from 'react'
import { Helmet } from 'react-helmet-async'
import MenuLevel2 from './Components/MenuLevel2'
import "./style.sass"
import { Navigate, Route, Routes } from 'react-router-dom';
import CommonComponent from './Components/CommonComponent';

const Activities = (props) => {
  return (
    <>
        <Helmet>
            <title>Activities | Quiz</title>
        </Helmet>
        <div className="a-activities max-height">
            <MenuLevel2></MenuLevel2>
        </div>
        <Routes>
            <Route index={true} path="/running" element={<CommonComponent></CommonComponent>}></Route>
            <Route path="/completed" element={<CommonComponent></CommonComponent>}></Route>
            <Route path="/created" element={<CommonComponent></CommonComponent>}></Route>
            <Route path="/" element={<Navigate replace to={"/activities/running"}></Navigate>} />
        </Routes>
    </>
  )
}

export default Activities
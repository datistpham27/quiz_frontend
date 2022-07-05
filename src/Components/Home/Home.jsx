import React, { Fragment, useContext} from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import CreateClass from '../Admin/Components/CreateClass/CreateClass'
import CreateSet from '../Admin/Components/CreateSet/CreateSet'
import Term from '../Admin/Components/Term/Term'
import Header from '../Header/Header'
import NavigationResponsive from '../NavigationResponsive/NavigationResponsive'
import { NeedAuthenticate } from '../NeedAuthenticate/NeedAuthenticate'
import Search from '../Search/Search'
import Settings from '../Settings/Settings'
import SkeletonAuth from '../SkeletonApp/SkeletonAuth'
import Activities from './Activities/Activities'
import Classes from './Classes/Classes'
import DetailClass from './Classes/Components/DetailClass/DetailClass'
import Main from './Main'

const Home = (props) => {
  const location= useLocation()
  const {auth, error, loading}= useContext(UserContext)
  return (
    <Fragment>
      {
        error && <div>{error}</div>
      }
      {
        loading=== true ? <SkeletonAuth></SkeletonAuth> :
        <>
          {
            !location?.pathname?.includes("/admin") && !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
            <Header></Header>
          }

          {
            !location?.pathname?.includes("/admin") && !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
            <NavigationResponsive></NavigationResponsive>
          }
          <Routes>  
            {
              !location?.pathname?.includes("/admin") &&
              <Route path="/*" index element={<Main></Main>}></Route>
            }
            {
              auth=== true &&
              <>
                <Route path="/activities/*" element={<Activities></Activities>} ></Route>
                <Route path="/classes/*" element={<Classes></Classes>}></Route>
                <Route path="/create-set" element={<CreateSet></CreateSet>}></Route>
                <Route path="/create-quiz" element={<></>}></Route>
                <Route path="/create-class" element={<CreateClass></CreateClass>}></Route>
                <Route path="/term/:id_term/:title_term/*" element={<Term></Term>}></Route>
              </>
            }
            {
              auth=== false && 
              <>
                <Route path="/activities/*" element={<NeedAuthenticate></NeedAuthenticate>}></Route>
                <Route path="/classes/*" element={<NeedAuthenticate></NeedAuthenticate>}></Route>
              </>
            }
            <Route path="/class/:id_class/*" element={<DetailClass></DetailClass>}></Route>
            <Route path="/settings" element={<Settings></Settings>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
          </Routes>
        
        </>
      }
    </Fragment>
  )
}

export default Home
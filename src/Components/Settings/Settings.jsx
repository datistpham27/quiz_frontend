import React, { useContext, useState } from 'react'
import Title from './Components/Title'
import { Helmet } from "react-helmet-async" 
import "./style.sass"
import InfoUser from './Components/InfoUser'
import SettingGame from './Components/SettingGame'
import DangerousSetting from './Components/DangerousSetting'
import ChangeSetting from './Components/ChangeSetting'
import { UserContext } from '../../App'

const Settings = (props) => {
  const { auth }= useContext(UserContext)
  const [openchange, setopenchange]= useState(()=> false)
  const [changeSetting, setChangeSetting]= useState(()=> ({}))
  return (
    <>
      <Helmet>
        <title>
          Settings | Quiz
        </title>
      </Helmet>
      <div className="settings max-height">
        <Title></Title>
        
        {
          auth=== true && <InfoUser setChangeSetting={setChangeSetting} setopenchange={setopenchange}></InfoUser>
        }
        <br />

        <SettingGame></SettingGame>
        
        <br />

        {
          auth=== true && <DangerousSetting setChangeSetting={setChangeSetting} setopenchange={setopenchange}></DangerousSetting>
        }
      </div>

      {
        openchange=== true &&
        <ChangeSetting {...changeSetting} openchange={openchange} setopenchange={setopenchange} setChangeSetting={setChangeSetting} ></ChangeSetting> 
      }
    </>
  )
}

export default Settings
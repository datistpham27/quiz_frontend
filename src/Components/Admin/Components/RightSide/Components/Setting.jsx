import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../../App'
import "./style.sass"

const Setting = () => {
  const { user }= useContext(UserContext)
  return (
    <div className="setting-admin">
      <div className="wrapper-setting-admin">
        <Title title={"Settings"}></Title>
        <Component readOnly={true} type={"text"} placeholder={""} value={user?.email} label={"Email"}></Component>
        <Component readOnly={false} type={"text"} placeholder={""} value={user?.data?.userLogin?.account_name} label={"Account name"}></Component>
        <Component readOnly={false} type={"text"} placeholder={""} value={user?.data?.userLogin?.displayName} label={"Name"}></Component>
        <ButtonSave></ButtonSave>
        <DeleteAccount></DeleteAccount>
      </div>
    </div>
  )
}

export default Setting

const Title= (props)=> {
  return (
    <div className="setting-admin-title">
      {props.title}
    </div>
  )
}

const Component= (props)=> {
  const [inpValue, setInpValue]= useState(props?.value || "")
  return (
    <div className="setting-admin-inp">
      <div className="setting-admin-label">
        {props.label}
      </div>
      <div className="wrapper-setting-inp">
       <input readOnly={props?.readOnly} onChange={(e)=> setInpValue(e.target.value)} type={props.type} placeholder={props.placeholder} value={inpValue || props?.value} className="setting-admin-inp-content" />
      </div>
    </div>
  )
}

const ButtonSave= (props)=> {
  return (
    <div className="button-save-setting">
      Save changes
    </div>
  )
}

const DeleteAccount= (props)=> {
  return (
    <div className="delete-account-setting-admin">
      Delete account permanent
    </div>
  )
}
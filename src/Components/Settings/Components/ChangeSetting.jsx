import { useMutation } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { UserContext } from '../../../App'
import UPDATEUSER from '../../../docs/graphql/mutation/update_user'
import FatalComponentChange from './ComponentChange/FatalComponentChange'
import SelectComponentChange from './ComponentChange/SelectComponentChange'
import TextComponentChange from './ComponentChange/TextComponentChange'
import Title from './ComponentChange/Title'

const ChangeSetting = (props) => {
  const refChange= useRef()
  const clickoutside= useCallback((e)=> {
    if(refChange?.current && !refChange?.current?.contains(e.target)) {
        props.setopenchange(()=> false)
    }
  }, [props])
  useEffect(()=> {
    document.addEventListener("mousedown", clickoutside)
    return ()=> {
        document.removeEventListener("mousedown", clickoutside)
    }
  }, [clickoutside])
  
  return (
    <div className="wrapper-settings">
        <div ref={refChange} data-check-outside={true} className={props.openchange === true ? "change-settings slide-change-settings" : "change-settings vanilla-change-settings"}>
            <Title title={props.title}></Title>
            {
                props.isText=== true &&
                <TextComponentChange setChangeSetting={props.setChangeSetting} text={props.text} placeholder={props.placeholder}></TextComponentChange>
            }
           
            {
                props.isSelect=== true &&
                <SelectComponentChange setChangeSetting={props.setChangeSetting} arraySelect={props.arraySelect} select={props.select} placeholder={props.placeholder}></SelectComponentChange>
            }
            {
                props.isFatal=== true &&
                <FatalComponentChange setChangeSetting={props.setChangeSetting} fatalMessage={props.fatalMessage} ></FatalComponentChange>
            }
            <ConfirmChange setopenchange={props.setopenchange}></ConfirmChange>
        </div>
    </div>
  )
}
const ConfirmChange= (props)=> {
    const { user }= useContext(UserContext)
    // eslint-disable-next-line
    const [updateUser, {loading, error, data}]= useMutation(UPDATEUSER)
    return (
        <div className="confirm-change">
            <div className="trigger-confirm-change confirm-change-component" onClick={()=> {
                updateUser({variables: {
                    ...user?.data?.userLogin
                }})
                props.setopenchange(()=> false)
            }}>
                Confirm
            </div>
            <div className="cancel-confirm-change confirm-change-component" onClick={()=> props.setopenchange(()=> false)}>
                Cancel
            </div>
            
        </div>
    )
}

export default ChangeSetting
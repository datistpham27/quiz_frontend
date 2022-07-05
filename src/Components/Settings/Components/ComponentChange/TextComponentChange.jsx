import React, { useContext } from 'react'
import { UserContext } from '../../../../App'

const TextComponentChange = (props) => {
  const { setuser }= useContext(UserContext)
  return (
    <div className="text-component-change">
        <input onChange={(e)=> setuser(prev=> ({...prev, a: e.target.value}))} type="text" placeholder={props.placeholder} className="text-input-component-change" />
    </div>
  )
}

export default TextComponentChange
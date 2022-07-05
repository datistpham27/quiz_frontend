import React from 'react'

const Title = (props) => {
  return (
    <div className="title-create-set">
        <NameTitle nametitle={"Create new term"}></NameTitle>
        <BtnCreate createTerm={props?.createTerm}></BtnCreate>
    </div>
  )
}

const NameTitle= (props)=> {
    return (
        <div className="name-title-create-set">
            {props.nametitle}
        </div>
    )
}

const BtnCreate= (props)=> {
    return (
        <div className="btn-create-set" onClick={()=> props?.createTerm()}>
            Create
        </div>
    )
}

export default Title
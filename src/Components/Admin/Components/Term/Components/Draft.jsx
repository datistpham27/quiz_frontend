import React, { useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TermContext } from '../Term';

const Draft = (props) => {
  const [flip, setFlip]= useState(()=> true)
  const { data }= useContext(TermContext)
  const [currentPage, setCurrentPage]= useState(()=> data?.get_term?.current_question || 1)
  return (
    <div className="draft-term">
      <div className="main-draft-term">
        <Component flip={flip} setFlip={setFlip} currentPage={currentPage}></Component>
      </div>
      <Control setFlip={setFlip} setCurrentPage={setCurrentPage} currentPage={currentPage}></Control>
    </div>
  )
}

const Component= (props)=> {
  const { data }= useContext(TermContext)
  return (
    <div className="wp-main-draft-term" onClick={()=> props?.setFlip(prev=> !prev)}>
      <div className="q-main-draft-term" style={{opacity: props?.flip=== true ? 1 : 0, transform: props?.flip=== false ? "rotateX(270deg)" : "rotateX(0)", userSelect: "none" }}>
        {data?.get_term?.list_question[props?.currentPage -1]?.question?.split("\n")[0]}
      </div>
      <div className="a-main-draft-term" style={{opacity: props?.flip=== true ? 0 : 1, transform: props?.flip=== false ? "rotateX(0)" : "rotateX(270deg)" , userSelect: "none"}}>
      {data?.get_term?.list_question[props?.currentPage -1]?.answer}
      </div>
    </div>
  )
}

const Control= (props)=> {
  const { data }= useContext(TermContext)
  return (
    <div className="control-draft-term">
      <div className="no-m"></div>
      <MainControl {...props} {...data?.get_term}></MainControl>
      <Option {...data?.get_term}></Option>
    </div>  
  )
}

const MainControl= (props)=> {
  return (
    <div className="main-control-draft-term">
      <button disabled={props?.currentPage <= 1 ? true : false} style={{border: "none", background: "transparent", cursor: "pointer",  display :"flex", justifyContent: "center", alignItems: 'center'}} className="vl-492" onClick={()=> {props?.setCurrentPage(prev=> parseInt(prev) - 1);props?.setFlip(()=> true)}}>
        <ArrowRightAltIcon></ArrowRightAltIcon>
      </button>
      <CurrentPage {...props}></CurrentPage>
      <button disabled={props?.currentPage >= props?.count_question ? true : false} style={{border: "none", background: "transparent", cursor: "pointer", display :"flex", justifyContent: "center", alignItems: 'center',}} className="js-921" onClick={()=> {props?.setCurrentPage(prev=> parseInt(prev) + 1);props?.setFlip(()=> true)}}>
        <ArrowRightAltIcon></ArrowRightAltIcon>
      </button>
    </div>
  )
}

const CurrentPage= (props)=> {
  return (
    <div className="cp-draft-term">
      {props?.currentPage || 1}/{props?.count_question}
    </div>
  )
}

const Option= (props)=> {
  const navigate= useNavigate()
  const { data }= useContext(TermContext)
  return (
    <div className="op-draft-term" onClick={()=> navigate(`/term/${data?.get_term?.id_term}/${data?.get_term?.title?.toString().toLowerCase().replaceAll(" ", "-")}/flashcards`)}>
      <FullscreenIcon></FullscreenIcon>
    </div>
  )
}

export default Draft
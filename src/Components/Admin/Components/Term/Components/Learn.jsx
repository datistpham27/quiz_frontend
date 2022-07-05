import React, {  useEffect, useState } from 'react'
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { ComponentSummary } from './Test';

const Learn = (props) => {
  const navigate= useNavigate()
  const [currentPage, setCurrentPage]= useState(()=> 0)
  const [countCorrectAnswer, setCountCorrectAnswer]= useState(()=> 0)
  return (
    <>
      <Helmet>
        <title>{`Learn: ${props?.get_term?.title} | Quiz`}</title>
      </Helmet>
      <div className="learn">
        <div className="header-learn" style={{position: "relative"}}>
          <div className="back">
            <div className="rwkowiear" onClick={()=> navigate(-1)}>
              <div className="wrap-icon">
                <ArrowBackIosIcon className="icon-main"></ArrowBackIosIcon>
              </div>
              <div className="text-main">
                Back
              </div>
            </div>
            <div className="fperdiefdews">
              <div className="wrap-icon">
                <SchoolIcon className="icon-main"></SchoolIcon>
              </div>
              <div className="text-main">
                Learn 
              </div>
            </div>
          </div>
          <div className="main-title">{props?.get_term?.title}</div>
          <div className="exit-learn">
            <div className="btn-exit" onClick={()=> navigate(-1)}>
              <CloseIcon></CloseIcon>
            </div>
          </div>
          {
            <div style={{width: `calc(${parseInt(countCorrectAnswer)} / ${props?.get_term?.count_question} * 100%)` || 0, height: 2.5, background: "#7b89c9", position: "absolute", bottom:0 , zIndex: 11, left: 0}}></div>
          }
        </div>
        {
          parseInt(currentPage) < parseInt(props?.get_term?.count_question) && 
          <ComponentLearn1 countCorrectAnswer={countCorrectAnswer} setCountCorrectAnswer={setCountCorrectAnswer} currentPage={currentPage} setCurrentPage={setCurrentPage} {...props}></ComponentLearn1>
        }
        {
          parseInt(currentPage) === parseInt(props?.get_term?.count_question) &&
          <><ComponentSummary countCorrectAnswer={countCorrectAnswer} {...props}></ComponentSummary></>
        }
      </div>

    </>
  )
}


export const ComponentLearn= (props)=> {
  const [select, setSelect]= useState(()=> undefined)
  const [answer, setAnswer]= useState(()=> undefined)
  const ref= useRef()
  
  return (
    <div ref={ref} className="w-learn" data-index={props?.index} data-id-question={props?.id_question} data-answer={answer}>
      <div className="m-learn" style={{height: "auto"}}>
        <div className="d-learn">
          <div className="tm-learn">
            Definition
          </div>
          <div className="q-learn">
            {props?.question?.split("\n")[0]}
          </div>
        </div>
        <div className="a-learn">
          <div className="taoijsddada">Choose correct answer</div>
          <div className="w-answer">
            {
              props?.question?.split("\n")?.slice(1,5)?.map((item, key)=> <Component setAnswer={setAnswer} id_question={props.id_question} setListAnswer={props?.setListAnswer} setNumberAnswer={props?.setNumberAnswer} setSelect={setSelect} select={select} key={key} index={parseInt(key)+ 1} item={item}></Component>)
            } 
          </div>
        </div>
      </div>
    </div>
  )
}

const Component= (props)=> {
  // const [answer, setAnswer]= useState(()=> ({}))
  const f1= ()=> {
    props?.setSelect(()=> undefined)
    props?.setNumberAnswer(prev=> prev-1)
    props?.setAnswer(()=> undefined)
  }
  const f2= (e)=> {
    props?.setSelect(()=> parseInt(props?.index))
    props?.setAnswer(()=> (props?.item?.split(".")[1].trim()))
    if(props?.select === undefined) {
      props?.setNumberAnswer(prev=> parseInt(prev)+ 1)
    }
  }
  return (
    <div className="a-answer" onClick={()=> parseInt(props?.select) === parseInt(props?.index) ? f1() : f2()} data-key={props?.index} style={{borderColor: parseInt(props?.select)=== parseInt(props?.index) ? "#4257b2" : "#e7e7e7", background: parseInt(props?.select)=== parseInt(props?.index) ? "#eff3fb" : "#fff"}}>
      <div className="index-answer">
        {props?.item?.split(".")[0].trim()}
      </div>
      <div className="main-answer-1">
        {props?.item?.split(".")[1].trim()}
      </div>
    </div>
  )
}

export default Learn


export const ComponentLearn1= (props)=> {
  const [select, setSelect]= useState(()=> undefined)
  const [answer, setAnswer]= useState(()=> undefined)
  const [correctAnswer, setCorrectAnswer]= useState(()=> undefined)
  const wait= (ms)=> new Promise(rel=> setTimeout(rel, ms))
  const ref= useRef()
  useEffect(()=> {
    (async()=> {
      document.body.style.overflow= "hidden"
      ref.current.classList.add("saadfsdfsdsfsdf")
      await wait(250)
      ref.current?.classList?.remove("saadfsdfsdsfsdf")
      document.body.style.overflow= "auto"
    })()

  }, [props?.currentPage])
  return (
    <div className="w-learn" data-index={props?.index} data-id-question={props?.id_question} data-answer={answer}>
      <div ref={ref} className="m-learn" style={{height: "468px", transition: 'all .25s linear'}}>
        <div className="d-learn">
          <div className="tm-learn">
            Definition
          </div>
          <div className="q-learn">
            {props?.get_term?.list_question[props?.currentPage]?.question?.split("\n")[0]}
          </div>
        </div>
        <div className="a-learn">
          <div className="taoijsddada">Choose correct answer</div>
          <div className="w-answer">
            {
              props?.get_term?.list_question[props?.currentPage]?.question?.split("\n")?.slice(1, 5)?.map((item, key)=> <Component1 setCountCorrectAnswer={props?.setCountCorrectAnswer} currentPage={props?.currentPage} setCurrentPage={props?.setCurrentPage} setCorrectAnswer={setCorrectAnswer} answer={props?.get_term?.list_question[props?.currentPage]?.answer} key={key} item={item}></Component1>)
            }
          </div>
        </div>
      </div>
      {
        correctAnswer=== false &&
        <div className="fksadsfasd" style={{width: "100%", position: "fixed", bottom: 0, left: 0, height: 80, background: "#fff", padding: "0 24px", display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
          <div style={{height: 48, borderRadius: 10, background: "#4255ff", padding: "12px 24px", color: "#fff", fontSize: 19, fontWeight: 600, cursor: "pointer"}} onClick={()=> {setCorrectAnswer(()=> undefined );props?.setCurrentPage(prev=> parseInt(prev) + 1)}}>Continue</div>
        </div>
      }
    </div>
  )
}

const Component1= (props)=> {
  // const [answer, setAnswer]= useState(()=> ({}))
  const wait= (ms)=> new Promise(rel=> setTimeout(rel, ms))
  const [correctAnswer, setCorrectAnswer]= useState(()=> undefined)
  const submit= async ()=> {
    if(props?.item?.split(".")[1].trim().toString()=== props.answer) {
      setCorrectAnswer(()=> true)
      props?.setCorrectAnswer(()=> true)
      await wait(2000)
      props?.setCountCorrectAnswer(prev=> parseInt(prev) + 1)
      props?.setCurrentPage(prev=> parseInt(prev) + 1)
      return
    }
    setCorrectAnswer(()=> false)
    return props?.setCorrectAnswer(()=> false)
  }
  useEffect(()=> {
    setCorrectAnswer(()=> undefined)
  }, [props?.currentPage])
  return (
    <div className="a-answer" onClick={()=> submit()} style={{borderColor: correctAnswer=== true ? "#23b26d" : correctAnswer=== false ? "#ff9c8c" : "#e7e7e7" , backgroundColor: correctAnswer=== true ? "#f2fbf6" : "#fff", pointerEvents: correctAnswer=== true ? "none" : correctAnswer=== false ? "none" : "all"}}>
        {
          correctAnswer=== undefined &&
          <div className="index-answer">
            {props?.item?.split(".")[0].trim()}
          </div>
        }
        {
          correctAnswer=== true &&
          <CheckIcon style={{color: "#23b26d", marginRight: 8}}></CheckIcon>
        }
        {
          correctAnswer=== false &&
          <CloseIcon style={{color: "#ff9c8c", marginRight: 8, marginTop: 2}}></CloseIcon>
        }
      <div className="fdksdasfadsf">

      </div>
      <div className="main-answer-1" style={{color: correctAnswer=== true ? "#23b26d" : correctAnswer=== false ? "#ff9c8c" : "#3a3b3c"}}>
        {props?.item?.split(".")[1].trim()}
      </div>
    </div>
  )
}

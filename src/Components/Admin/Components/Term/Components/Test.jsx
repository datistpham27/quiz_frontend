import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LoginIcon from '@mui/icons-material/Login';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { ComponentLearn } from './Learn';
import { useNavigate } from 'react-router-dom';
import { round } from 'lodash';

const Test = (props) => {
  const navigate= useNavigate()
  const [open, setOpen]= useState(()=> false)
  const [complete, setComplete]= useState(()=> false)
  const [numberAnswer, setNumberAnswer]= useState(()=> 0)
  //
  const [listAnswer, setListAnswer]= useState(()=> [])
  return (
    <>
        <Helmet>
            <title>{`Test: ${props?.get_term?.title} | Quiz`}</title>
        </Helmet>
        <div className="test">
            <div className="header-test-fake">
            </div>
            <div className="header-test">
                <div className="header-test-1">
                    <div className="gjfkdsdfdgadfsd">
                        <div className="wrap-icon dghuehrdgd">
                            <LoginIcon></LoginIcon>
                        </div>
                        <div className="fgjrkgdefds">
                            <div className="djfgorjgdioa">
                                Test
                            </div>
                            <div className="wrap-icon">
                                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-test-2">
                    <section className="c-question">
                        {numberAnswer} / {props?.get_term?.count_question}
                    </section>
                    <section className="t-question">
                        {props?.get_term?.title}
                    </section>
                </div>
                <div className="header-test-3">
                    <div className="djfjgirfdds">
                        <div className="fkosekfdfefdse" onClick={()=> setOpen(prev=> !prev)}>Options</div>
                        {
                            open=== true &&
                            <div className="fjfdesesereq">
                                <div>Limit question:</div>&nbsp;&nbsp;<input type="number" className="gjdsfdsdfa" max={props?.get_term?.count_question} />/{props?.get_term?.count_question}
                            </div>
                        }
                    </div>
                    <div className="fgkdopefdefd" onClick={()=> navigate(-1)}>
                        <div className="wrap-icon">
                            <CloseIcon className="close-icon"></CloseIcon>
                        </div>
                    </div>
                </div>
                {
                    <div style={{width: `calc(${parseInt(numberAnswer)} / ${props?.get_term?.count_question} * 100%)` || 0, height: 2, background: "#7b89c9", position: "absolute", bottom:0 , zIndex: 11, left: 0}}></div>
                }
            </div>
            {
                complete=== false &&
                <div className="main-test">
                    {
                        props?.get_term?.list_question?.map((item, key)=> <ComponentLearn setListAnswer={setListAnswer} setNumberAnswer={setNumberAnswer} key={key} {...item} index={parseInt(key) + 1}></ComponentLearn>)
                    }
                    <br />
                    <div className="rkghfordg">
                        <div className="btn-show-answer" onClick={()=> setComplete(()=> true)}>
                            Show the answers
                        </div>
                    </div>
                </div>
            }
            {
                complete=== true &&
                <Summary {...props} setNumberAnswer={setNumberAnswer}></Summary>
            }
        </div>
    </>
  )
}

const Summary= (props)=> {
    return (
    <div className="summary-result">
        <div className="gfkefdgedfaa">
            <section className="wjewirfjsdas">
                <h3 className="gfgjifdefs">You have completed the test!</h3>
                <div className="staticstic">
                    <div className="correct-ratio">
                        <div className="fidjsfisasf">Result</div>
                        <div className="percent">0/{props?.get_term?.count_question} (0%)</div>
                    </div>
                    <div className="average-time">
                        <div className="djskfjddsas">Time</div>
                        <div className="time">1 minute</div>
                    </div>
                </div>
                <div className="op12">
                    <div className="dsfgdsfddga">Retake wrong answers</div>
                    <div className="dsfgdsfddga">New test</div>
                </div>
            </section>
        </div>
        <div className="list-staticstic main-test" style={{marginTop: 80}}>
            <div className="greet" style={{fontSize: 24, fontWeight: 600, padding: "24px 32px"}}>{props?.get_term?.count_question} question multiple answers</div>
            {
                props?.get_term?.list_question?.map((item, key)=> <ComponentLearn setNumberAnswer={props?.setNumberAnswer} key={key} {...item} index={parseInt(key) + 1}></ComponentLearn>)
            }
        </div>
    </div>
    )
}

export const ComponentSummary= (props)=> {
    const navigate= useNavigate()
    return (
        <>
            <div className="gfkefdgedfaa" style={{marginTop: 8}}>
                <section className="wjewirfjsdas">
                    <h3 className="gfgjifdefs">You have completed the lesson!</h3>
                    <div className="staticstic">
                        <div className="correct-ratio">
                            <div className="fidjsfisasf">Result</div>
                            <div className="percent">{props?.countCorrectAnswer}/{props?.get_term?.count_question} ({round(props?.countCorrectAnswer / props?.get_term?.count_question * 100, 0)}%)</div>
                        </div>
                        <div className="average-time">
                            <div className="djskfjddsas">Time</div>
                            <div className="time">1 minute</div>
                        </div>
                    </div>
                    <div className="op12">
                        <div className="dsfgdsfddga" onClick={()=> window.location.reload()}>Retake lesson</div>
                        <div className="dsfgdsfddga" onClick={()=> navigate(`/term/${props?.get_term?.id_term}/${props?.get_term?.title}`)}>Back to term</div>
                    </div>
                </section>
            </div>  
        </>
    )
}

export default Test
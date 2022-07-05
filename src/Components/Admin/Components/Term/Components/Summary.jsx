import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const Summary = (props) => {
  return (
    <div className="summary">
        <br /><br />
        <div className="st-291">
            Terminology to learn in this course (15)
        </div>
        <br />
        <Learning></Learning>
        <NotLearn></NotLearn>
    </div>
  )
}

const Learning= (props)=> {
    return (
        <div className="learning">
            <div className="w1-learning">
                <div className="t-learning">Learning (4)</div>
                <div className="m-learning">You have already started learning these terms. Continue to promote offline!</div>
            </div>
            <br />
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
        </div>
    )
}

const NotLearn= (props)=> {
    return (
        <div className="not-learn">
            <div className="oe-293">
                <div className="kawoepksda">Not learn (11)</div>
                <div className="dkjweiewaw">You've not learnt terminologies yet</div>
            </div>
            <br />
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
            <ComponentLearn></ComponentLearn>
        </div>
    )
}

const ComponentLearn= (props)=> {
    return (
        <div className="cp-learn">
            <div className="q-learn">drink</div>
            <strong>|</strong>
            <div className="a-learn">drank, drunk</div>
            <div className="f-learn">
                <StarIcon></StarIcon>
            </div>
        </div>
    )
}

export default Summary
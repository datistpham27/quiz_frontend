import { useQuery } from '@apollo/client'
import React, { createContext, Fragment } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route, useParams } from 'react-router-dom'
import { UserContext } from '../../../../App'
import GET_TERM from '../../../../docs/graphql/query/get_term'
import Draft from './Components/Draft'
import FlashCards from './Components/FlashCards'
import Learn from './Components/Learn'
import Navigation from './Components/Navigation'
import Side1 from './Components/Side1'
import Summary from './Components/Summary'
import Test from './Components/Test'
import TitleTerm from './Components/TitleTerm'
import "./style.sass"

export const TermContext= createContext()
const Term = (props) => {
  const { user }= useContext(UserContext)
  const { id_term }= useParams()
  // eslint-disable-next-line
  const { data, error, loading }= useQuery(GET_TERM, {
    variables: {
        uid: user?.uid, id_term
    }
  })
  return (
    <TermContext.Provider value={{data}}>
        <Helmet>
            <title>Term | Quiz</title>
        </Helmet>
        <div className={"wrapper-term"}>
            <div className={"term"}>
                <Routes>
                    <Route path="/" element={<W1></W1>}></Route>
                    <Route path="/flashcards" element={<FlashCards {...data}></FlashCards>}></Route>
                    <Route path="/learn" element={<Learn  {...data} ></Learn>}></Route>
                    <Route path="/test" element={<Test {...data}></Test>}></Route>
                </Routes>
            </div>
        </div>
    </TermContext.Provider>
  )
}

const W1= (props)=> {
    const { data }= useContext(TermContext)
    return (
        <Fragment>
            <TitleTerm title_term={data?.get_term?.title}></TitleTerm>
            <div className="w1-201">
                <Navigation></Navigation>
                <Draft></Draft>
            </div>
            <Side1 {...data?.get_term?.author}></Side1>
            <Summary></Summary>
        </Fragment>
    )
}

export default Term
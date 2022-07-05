import { useQuery } from "@apollo/client"
import { createContext, Fragment, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Admin from "./Components/Admin/Admin"
import Home from "./Components/Home/Home"
import USERLOGIN from "./docs/graphql/query/user_login"
import { persistanceLogin } from "./Firebase/function/persistance"

export const UserContext= createContext()
const App= (props)=> {
  const [auth, setauth]= useState(()=> false)
  const [user, setuser]= useState(()=> {})
  // eslint-disable-next-line
  const { data, error, loading}= useQuery(USERLOGIN, {variables: {
    uid: user?.uid || ""
  }})
  useEffect(()=> {
    persistanceLogin(setuser, setauth)
  }, [])
  useEffect(()=> {
    setuser(prev=> ({...prev, data}))
  }, [data])
  return (
    <UserContext.Provider value={{auth, setuser, setauth, user, error, loading}}>
      <Fragment>
        <Router>
          <Routes>
            <Route path="/*" element={<Home></Home>}></Route>   
            <Route path="/admin/*" element={<Admin></Admin>}></Route>

          </Routes>
        </Router>
      </Fragment>
    </UserContext.Provider>
  )
}

export default App
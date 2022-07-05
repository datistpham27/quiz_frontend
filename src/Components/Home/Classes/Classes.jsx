import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import CHECK_USER_JOIN_ALL_CLASS from '../../../docs/graphql/query/check_user_join_all_class'
import NoJoinClasses from './Components/NoJoinClasses'
import "./style.sass"

const Classes = (props) => {
  const { user }= useContext(UserContext)
  // eslint-disable-next-line
  const { data, error, loading }= useQuery(CHECK_USER_JOIN_ALL_CLASS, ({
    variables: {
      id_user: user?.uid
    }
  }))
  return (
    <>
      <Helmet>
          <title>Classes | Quiz</title>
      </Helmet>
      <div className="classes max-height">
        {
          data && data?.check_user_join_all_class?.length <=0 &&
          <NoJoinClasses></NoJoinClasses>
        }
        {
          data && data?.check_user_join_all_class?.length >0 &&
          <>
            <div style={{margin: "16px 0", fontSize: 18, fontWeight: 600 , width: "100%"}}>Your class: </div>
            {
              data?.check_user_join_all_class?.map((item, key)=> <div key={key} className="dvkadvadsfvdds" style={{width: '100%'}}><ClassJoin key={key} {...item}></ClassJoin></div>)
            }
          </>
        }
      </div>
    </>
  )
}

const ClassJoin= (props)=> {
  return (
    <Link style={{textDecoration: "none", color: "#3a3b3c"}} to={"/class/"+ props?.id_class+"/"}>
      <div className="dvkadvadsfvdds" style={{padding: 16, borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", width: "max-content"}}>
        <div style={{fontSize: 20, }}>{props?.class_name}</div>
        <br />
        <div>Description: <strong>{props?.description}</strong></div>
        <br />
        <div style={{display: "flex", alignItems: "center", gap: 8}}>Created by: <img src={props?.photoURL} alt="" style={{width: 28, height: 28, borderRadius: "50%", objectFit: "cover"}} /><strong>{props?.displayName}</strong></div>
      </div>
    </Link>
  )
}

export default Classes  
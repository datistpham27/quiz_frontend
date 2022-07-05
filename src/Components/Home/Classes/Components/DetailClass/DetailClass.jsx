import React, { createContext, Fragment, useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import "./style.sass"
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Share2 } from '../../../../Admin/Components/Term/Components/Side1';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import MEMBER_OF_CLASS from '../../../../../docs/graphql/query/query_member_of_class';
import { CircularProgress } from '@mui/material';
import GET_INFO_CLASS from '../../../../../docs/graphql/query/get_info_class';
import CHECK_USER_JOIN_CLASS from '../../../../../docs/graphql/query/check_user_join_class';
import { UserContext } from '../../../../../App';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import REQUEST_JOIN_CLASS from '../../../../../docs/graphql/query/request_join_class';
import Login from '../../../../Login/Login';
import QUERY_TERM from '../../../../../docs/graphql/query/query_term';
import ADD_TERM_TO_CLASS from '../../../../../docs/graphql/mutation/add_term_to_class';
import PERFORM_REQUEST_JOIN_CLASS from '../../../../../docs/graphql/mutation/perform_request_join_class';
import GET_TERM_OF_CLASS from '../../../../../docs/graphql/query/get_term_of_class';
import { Link } from 'react-router-dom';

const CheckUserJoinClassContext= createContext()
export default function CheckUserJoinClass({children}) {
  const { user, auth }= useContext(UserContext) 
  const { id_class }= useParams()
  // eslint-disable-next-line
  const {data, loading, error }= useQuery(CHECK_USER_JOIN_CLASS, ({
    variables: {id_user: user?.uid || "", id_class}
  }))
  return <CheckUserJoinClassContext.Provider value={{role: data?.check_user_join_class}}>
    {
      auth=== true &&
      <DetailClass></DetailClass>
    }
    {
      auth=== false &&
      <Login></Login>
    }
  </CheckUserJoinClassContext.Provider>
}

export const DetailClassContext= createContext()
const DetailClass = (props) => {
  const { id_class }= useParams()
  const { role }= useContext(CheckUserJoinClassContext)

  // eslint-disable-next-line
  const { data, loading, error }= useQuery(GET_INFO_CLASS, {
    variables: {id_class}
  })
  return (
    <DetailClassContext.Provider value={{id_class, data}}> 
        <Helmet>
          <title>{`${data?.getinfoclass?.class_name} | Quiz` || "Loading..."}</title>
        </Helmet>
        <div className="wrapper-detail-class">
          <div className="detail-class">
            <Title1 ></Title1>
            <br />
            {
              role?.check=== 1 &&
              <Fragment>
                <Navigation {...role}></Navigation>
                <br />
                <div className="wrap-main">
                  <Routes>
                    <Route path="/">
                      <Route path="" index element={<ListTerm></ListTerm>}></Route>
                      <Route path="members" element={<ListMember></ListMember>}></Route>
                      {
                        role?.isOwner === true &&
                        <Route path="request" element={<RequestJoinClass></RequestJoinClass>}></Route>
                      }
                      <Route path="*" element={<>Not found</>}></Route>
                    </Route>
                  </Routes>
                  <Side></Side>
                </div>
              </Fragment>
            }
            {
              role?.check=== 0 && 
              <div style={{textAlign: "center", fontSize: 20, fontWeight: 600, padding: 24}}> 
                You're not member of this class
              </div>
            }
          </div>
        </div>
    </DetailClassContext.Provider>
  )
}

//

const Title1= (props)=> {
  const { role }= useContext(CheckUserJoinClassContext)
  return (
    <div className="title-1111">
      <CTitle1></CTitle1>
      {
        role?.check=== 1 &&
        <CTitle2></CTitle2>
      }
    </div>
  )
}

const CTitle1= (props)=> {
  const { data }= useContext(DetailClassContext)
  return (
    <div className="jifjdskfsdsassa">
      <div className="dfdijsdfd wrap-icon"><GroupIcon style={{width: 40, height: 40}} className="fsawjdfwesfdsa"></GroupIcon></div>
      <div className="gkaskaskasla">{data?.getinfoclass?.class_name || "_"}</div>
    </div>
  )
}

const CTitle2= (props)=> {
  const navigate= useNavigate()
  const [open, setOpen]= useState(()=> false)
  const { user }= useContext(UserContext)

  // eslint-disable-next-line
  const [queryTerm, { loading, data, error }]= useLazyQuery(QUERY_TERM)
  return (
    <div className="fgjesfdksaeskf" style={{position: "relative"}}>
      <Tooltip title={<div style={{fontSize: 15}}>Add new term</div>}>
        <div className="wrap-icon wedgfewrdgdewr" onClick={()=> setOpen(()=> true)}>
          <AddIcon></AddIcon>
        </div>
      </Tooltip>
      <Tooltip title={<div style={{fontSize: 15}}>Add new member</div>}>
        <div className="wrap-icon wedgfewrdgdewr">
          <GroupAddIcon></GroupAddIcon>
        </div>
      </Tooltip>
      {
        open=== true &&
        <div className="kfadkfslsfsa" style={{position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", top: 0, left: 0, zIndex: 12, display: "flex", justifyContent: 'center', alignItems: "center"}}>
          <div style={{width: "100%", maxWidth: 600, height: "auto", padding: 24, background: "#fff", borderRadius: 10,}}>
            <div style={{width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div style={{fontSize: 20, fontWeight: 600}}>Add term</div>
              <div className="wrap-icon" style={{cursor: "pointer"}} onClick={()=> setOpen(()=> false)}><ClearIcon></ClearIcon></div>
            </div>
            <br />
            <div className="jffdgkdadfdssd" style={{display: 'flex', justifyContent: 'center',alignItems: 'center', width: "100%", gap: 8, cursor: "pointer"}} onClick={()=> navigate("/create-set")}>
              <div style={{cursor: "pointer"}} className="wrap-icon">
                <AddIcon></AddIcon>
              </div>
              <div style={{fontSize: 18, fontWeight: 600}}>
                Create new term
              </div>  
            </div>
            <>
              <div onClick={()=> queryTerm({variables: {uid: user?.uid, type: 1}})} className="jffdgkdadfdssd" style={{fontWeight: 600, padding: "12px 4px", cursor: "pointer"}}>Your term</div>
            </>
            <br />
            <br />
            {
              data?.query_term?.length > 0 && data?.query_term?.map((item, key)=> <C3 key={key} {...item}></C3>)
            }
          </div>
        </div>
      }
    </div>
  )
}

//

const C3= (props)=> {
  const { id_class }= useParams()
  const [addTerm]= useMutation(ADD_TERM_TO_CLASS)
  const { user }= useContext(UserContext)
  return (
    <div className="fksfdkssdjk" style={{padding: "12px 8px", background: "#f2f0f5", borderRadius: 10, cursor: "pointer", display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
      <div style={{fontSize: 20, fontWeight: 600}}>{props.title}</div>
      <div onClick={()=> addTerm({variables: {id_term: props?.id_term, add_by: user?.uid, own_id: props?.own_id, id_class}})} className="wrap-icon"><AddIcon></AddIcon></div>
    </div>
  )
}

//

const Navigation= (props)=> {
  const { id_class }= useContext(DetailClassContext)
  return (
    <div className="navigation">
      <div className="wrap-navigation">
        <NavLink className={({isActive})=> (isActive ? "active-aaa" : "inactive-aaa")} to={`/class/${id_class}/`}>
          Terms
        </NavLink>
      </div>
      <div className="wrap-navigation">
        <NavLink className={({isActive})=> (isActive ? "active-aaa" : "inactive-aaa")} to={`/class/${id_class}/members`}>
          Members
        </NavLink>
      </div>
      {
        props?.isOwner=== true &&
        <div className="wrap-navigation">
          <NavLink className={({isActive})=> (isActive ? "active-aaa" : "inactive-aaa")} to={`/class/${id_class}/request`}>
            Request 
          </NavLink>
        </div>
      }
    </div>
  )
}

//

const ListTerm= (props)=> {
  const { id_class }= useParams()
  // eslint-disable-next-line
  const { data, loading, error }= useQuery(GET_TERM_OF_CLASS, {
    variables: {
      id_class
    }
  })
  return (
    <div className="wp">
      <div className="list-item-term">
        <div style={{fontSize: 18, fontWeight: 600}}>Terms of class</div>
        {
          data?.get_term_of_class?.length> 0 && data?.get_term_of_class?.map((item, key)=> <ComponentTerm key={key} {...item}></ComponentTerm>)
        }
      </div>
    </div>
  )
}
//

const ComponentTerm= (props)=> {
  return (
    <Link to={`/term/${props?.id_term}/${props?.title?.replaceAll(" ", "-")}`} style={{color: "#3a3b3c", textDecoration: "none"}}>
      <div className="fgbjgkaesfdkaes ddsiodjdsfdsf" style={{width: "100%", height: 60, borderRadius: 10, margin: "12px 0", display: "flex",justifyContent: "space-between", cursor: "pointer", background: "#f2f0f5", padding: 10, flexDirection: "column"}}>
        <div>{props.description}</div>
        <div style={{fontSize: 18, fontWeight: 600}}>{props?.title}</div>
      </div>
    </Link>
  )
}

//

const ListMember= (props)=> {
  const  { id_class }= useContext(DetailClassContext)

  const { data, loading }=  useQuery(MEMBER_OF_CLASS, {
    variables: {id_class}
  })
  if(loading) return <div className="wp"> <CircularProgress></CircularProgress> </div>
  else {

    return (
      <div className="wp">
        <div className="list-item-member">
          <div style={{fontSize: 18, fontWeight: 600}}>Members in class</div>
          <br />
          {
            data?.member_of_class?.length > 0 && data?.member_of_class?.map((item, key)=> <DetailMember key={key} {...item}></DetailMember>)
          }
        </div>
      </div>
    )
  }
}
//

const RequestJoinClass= (props)=> {
  const { id_class }= useContext(DetailClassContext)

  // eslint-disable-next-line
  const { data, loading, error }= useQuery(REQUEST_JOIN_CLASS, {
    variables: {id_class},
    pollInterval: 10000
  })
  return (
    <div className="ffdsfadsfsads wp" style={{flex: "1 1 0"}}>
      <div style={{fontSize: 18, fontWeight: 600}}>Request join class</div>
      <br />
      {
        data?.request_join_class?.length > 0 && data?.request_join_class?.map((item, key)=> <DetailRequest key={key} {...item}></DetailRequest>)
      }
      {
        data?.request_join_class?.length <=0 && <div>No any request join your class</div>
      }
    </div>
  )
}
//

const DetailRequest= (props)=> {
  const { id_class }= useParams()
  // eslint-disable-next-line
  const [requestJoin, { data, loading, error }]= useMutation(PERFORM_REQUEST_JOIN_CLASS)
  return (
    <div className="ddsiodjdsfdsf" style={{width: "100%", height: 60, borderRadius: 10, margin: "12px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "#f2f0f5", padding: 10}}>
      <div className="gfkgrdgesfdsdaas" style={{display: "flex", gap: 16}}>
        <div className="fgpsfdfsaesfsadsf" style={{display: "flex", justifyContent: "center" ,alignContent: "center", alignItems: "center"}}>
          <img src={props?.photoURL} alt="open" style={{width: 36, height: 36, borderRadius: "50%", objectFit: 'cover'}} />
        </div>
        <div className="fkaodsfksasfs" style={{display: "flex", flexDirection: "column",}}>
          <div style={{fontSize: 20}}><strong>{props?.displayName}</strong></div>
        </div>
      </div>
      <div className="fgsofdkdsfokdasa" style={{display: "flex", alignItems: "center", gap: 16}}>
        <div style={{cursor: "pointer", fontWeight: 600, color: "#56ee59eb"}} onClick={()=> requestJoin({variables: {id_class, id_user: props?.id_user, id_request_join: props?.id_request_join, type: 1}})}>Accept</div>
        <div style={{cursor: "pointer", fontWeight: 600, color: "#f51c19"}} onClick={()=> requestJoin({variables: {id_class, id_user: props?.id_user, id_request_join: props?.id_request_join, type: 2}})}>Deny</div>
      </div>
    </div>
  )
}

//
const DetailMember= (props)=> {
  return (
    <div className="ddsiodjdsfdsf" style={{width: "100%", height: 60, borderRadius: 10, margin: "12px 0", display: "flex", alignItems: "center", justifyItems: "space-between", cursor: "pointer", background: "#f2f0f5", padding: 10}}>
      <div className="gfkgrdgesfdsdaas" style={{display: "flex", gap: 16}}>
        <div className="fgpsfdfsaesfsadsf" style={{display: "flex", justifyContent: "center" ,alignContent: "center", alignItems: "center"}}>
          <img src={props?.photoURL} alt="open" style={{width: 36, height: 36, borderRadius: "50%", objectFit: 'cover'}} />
        </div>
        <div className="fkaodsfksasfs" style={{display: "flex", flexDirection: "column",}}>
          {
            props?.role> 1 && <div>Admin of class</div>
          }
          <div style={{fontSize: 20}}><strong>{props?.displayName}</strong></div>
        </div>
      </div>
      {
        props?.role > 2 &&
        <div className="fgsofdkdsfokdasa">

        </div>
      }
    </div>
  )
}

//

const Side= (props)=> {
  const { data }= useContext(DetailClassContext)
  return (
    <div className="side">
      <div className="fjfsfjsadsfadsda">
        Description
      </div>
      <div style={{fontSize: 18}}>
        <strong style={{fontSize: 18}}>
          {data?.getinfoclass?.description || "_"}
        </strong>
      </div>
      <br />
      <div></div>
      <div className="kfdfdaesfadfsadsfd">
        <Share2  hare2 link={`http://localhost:3000/join/class/${data?.getinfoclass?.code_invite}`}></Share2>
      </div>
    </div>
  )
}

//
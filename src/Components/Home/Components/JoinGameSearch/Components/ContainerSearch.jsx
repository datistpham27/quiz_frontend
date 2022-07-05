import React from 'react'
import BtnJoinGame from './BtnJoinGame'
import SearchBar from './SearchBar'
import "./style.sass"

const ContainerSearch = (props) => {
  return (
    <div className="container-search">
        <SearchBar></SearchBar>
        <BtnJoinGame></BtnJoinGame>
    </div>
  )
}

export default ContainerSearch
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = (props) => {
  return (
    <div className="search-bar">
        <div className="text-search-bar">
            <input type="text" className="enter-search-bar" placeholder="Search quiz" />
        </div>  
        <div className='btn-search-bar'>
            <SearchIcon className="btn-search-icon"></SearchIcon>
        </div>
    </div>  
  )
}

export default SearchBar
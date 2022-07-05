import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./style.sass"
import { Helmet } from 'react-helmet-async';

const Search = (props) => {
  return (
    <>
      <Helmet>
        <title>Search | Quiz</title>
      </Helmet>
      <div className="search-quiz">
          <div className={"title-search-quiz"}>
              Search
          </div>
          <div className={"main-search-quiz"}>
              <input type="text" className={"inp-main-search-quiz"} placeholder={"Search quiz"} />
          </div>
          <div className={"decorate-search-quiz"}>
              <SearchIcon className={"decorate-search-quiz-icon"}></SearchIcon>
              <div className={"decorate-search-quiz-text"}>Search for quiz on all fields such as: math, science, ...</div>
          </div>
      </div>
    </>
  )
}

export default Search
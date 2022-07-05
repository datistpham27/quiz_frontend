import React from 'react'
import { Helmet } from 'react-helmet-async'
import "./style.sass"

export const NeedAuthenticate = (props) => {
  return (
    <>
      <Helmet>
        <title>Login | Quiz</title>
      </Helmet>
      <div className="need-authenticate">
          <div className="wrapper-need-authenticate">
              <div className="text-need-authenticate">You need login to continue</div>
              <div className="btn-need-authenticate">
                Login
              </div>
          </div>
      </div>
    </>
  )
}

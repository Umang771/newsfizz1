import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand mx-4 text-light" to="/"><i><b></b></i></Link>

        <button className="navbar-toggler" type="button" data-target="#navbarSupported
          tent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-Link mx-2" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-Link mx-2" to="/about">General</Link> */}
              <Link className="nav-Link mx-2" to="/Technology">Technology</Link>
              <Link className="nav-Link mx-2" to="/Sports">Sports</Link>
              <Link className="nav-Link mx-2" to="/Science">Science</Link>
              <Link className="nav-Link mx-2" to="/Health">Health</Link>
              <Link className="nav-Link mx-2" to="/Entertainment">Entertainment</Link>
              <Link className="nav-Link mx-2" to="/Business">Business</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar

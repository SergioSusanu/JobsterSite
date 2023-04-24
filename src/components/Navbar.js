import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaHome, FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Logo from './Logo'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar, logoutUser } from "../features/user/userSlice";
const Navbar = () => {

  const {user} = useSelector((store)=> store.user)
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar
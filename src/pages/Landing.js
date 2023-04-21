import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'


const Landing = () => {
  return (
   <Wrapper>
    <nav>
        <Logo />
    </nav>
    <div className="container page">
        <div className="info">
            <h1>Job <span>Tracking</span> App</h1>
            <p>Apply for job interviews and keep track of your applications
                with this app
            </p>
            <button className="btn btn-hero">Login/Register</button>
        </div>
    
    <img src={main} alt="job hunt" className='img main-img' />
    </div>
   </Wrapper>
  )
}

export default Landing
import React from 'react'
import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name:'',
  email:'',
  password: '',
  isMember: true
}

const Register = () => {

  const [values, setValues] = useState(initialState)
  const {user, isLoading} = useSelector (store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues((prev) => {
      return {...prev, [name]:value}
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
   const {name, email, password, isMember} = values
   if (!email || !password || (!isMember && !name)){
    toast.warning("Please fill out all form fields")
   }
   if (isMember) {
    dispatch(loginUser({email, password}))
    return
   }
   dispatch(registerUser({name, email, password}))
  };

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  useEffect(()=>{
    if (user) navigate('/')
  }, [user])

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} action="#" className="form">
        <Logo />

        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <button type="button" className="btn btn-block btn-hipster" disabled={isLoading}
        onClick={()=> dispatch(loginUser({email: 'testUser@test.com', password:'secret'}))}>
          {isLoading ? "loading..." : "Demo"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {!values.isMember ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register
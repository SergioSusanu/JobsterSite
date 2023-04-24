import React from 'react'
import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from '../../features/user/userSlice';


const Profile = () => {

  const {user, isLoading} = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [userData, setuserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, email, lastName, location} = userData
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields')
      return
    }
    dispatch(updateUser(userData))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setuserData({...userData, [name]:value})
  }

  return (
    <Wrapper>
      <form action="#" className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Please wait ...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile
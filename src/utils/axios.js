import React from 'react'
import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((configuration)=>{
  const user = getUserFromLocalStorage()
  if (user)  {
    console.log(user.token);
    configuration.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return configuration;
})

export default customFetch
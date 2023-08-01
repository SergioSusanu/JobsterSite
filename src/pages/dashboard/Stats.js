import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../features/job/allJobsSlice'
import {ChartsContainer, Loading, StatsContainer} from '../../components/index'


const Stats = () => {
  const dispatch = useDispatch()
  const {isLoading, monthlyApplications } = useSelector ((store) => store.allJobs)

  useEffect(()=>{
    dispatch(getStats())
  },[])

  if (isLoading) {
    return <>
    Stats
    <Loading />
    </>;
  }
  
  return (
    <>
      <h1>Stats</h1>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}

export default Stats
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import Loading from './Loading'

function JobsContainer() {

  const {jobs, isLoading} = useSelector((store) => store.allJobs)
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    )
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>Jobs info</h5>
      <div className="jobs">
            {jobs.map((job) => {
       return <Job key={job._id} {...job} />
    })}
      </div>
    </Wrapper>

  )
}

export default JobsContainer
import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import FormRow from '../../components/FormRow'
import FormRowSelect from '../../components/FormRowSelect'
import { handleChange,  clearValues, createJob } from '../../features/job/jobSlice'

const AddJob = () => {

  const {isLoading, position, company, jobLocation, jobType, jobTypeOptions,
  status, statusOptions, isEditing, editJobId} = useSelector ((store) => store.job)
  const {user} =  useSelector((store) => store.user)

  const dispatch = useDispatch();  

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all the fields")
      return
    }

    dispatch(createJob({position, company, jobLocation, jobType, status}))
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
  }

  useEffect(()=>{
    if (!isEditing){
      dispatch(handleChange({name: 'jobLocation', value: user.location}))
    }
  },[])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="job location"
            handleChange={handleJobInput}
          />
          {/*Status select*/}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/*JobType select*/}
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText='job type'
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob
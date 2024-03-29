import React from 'react'
import {FormRow, FormRowSelect} from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'
import { handleChange, clearValues } from '../features/job/allJobsSlice'

function SearchContainer() {

  const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store) => store.allJobs);
  const dispatch = useDispatch()
  const {jobTypeOptions, statusOptions} = useSelector((store) => store.job)

  const handleSearch = (e) => {
    if (isLoading) return
    dispatch(handleChange({name:e.target.name, value: e.target.value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearValues())
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={ handleSearch }
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={ handleSearch }
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
           
            name="sort"
            value={sort}
            handleChange={ handleSearch }
            list={sortOptions}
          />
          <button
          className='btn btn-block btn-danger'
          disabled={isLoading}
          onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer
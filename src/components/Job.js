import React from 'react'
import { useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/Job'
import { Link } from 'react-router-dom';
import JobInfo from './JobInfo';
import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from 'react-icons/fa'
import moment from 'moment';
import { deleteJob, editJob } from '../features/job/jobSlice';

function Job({_id, position, company, jobLocation, jobType,
  createdAt, status}) {

    const dispatch = useDispatch()

    const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              type="button"
              onClick={() => dispatch(editJob({jobId:_id,
                position, company, jobLocation,status, jobType }))}
            >
              Edit
            </Link>
            <button
            
              className="btn delete-btn"
              type="button"
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job
import React from 'react'
import { useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/Job'
import { Link } from 'react-router-dom';

function Job({_id, position, company, jobLocation, jobType,
  createdAt, status}) {

    const dispatch = useDispatch()

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
          <h4>more content</h4>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              type="button"
              onClick={() => console.log("edit job")}
            >
              Edit
            </Link>
            <button
            
              className="btn delete-btn"
              type="button"
              onClick={() => console.log("delete job")}
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
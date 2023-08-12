import React from 'react'
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useSelector, useDispatch } from 'react-redux'

const PageBtnContainer = () => {

  const {numOfPages, page} = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  const aNumOfPages = Array.from(Array(numOfPages).keys())
  
  const nextPage = () => {
    console.log('next page');
  }

  const prevPage = () => {
    console.log('prev page');
  }

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {aNumOfPages.map((pNumber) => {
          return (
            <button
              type="button"
              key={pNumber}
              className={pNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => {
                console.log("p number clicked");
              }}
            >
              {pNumber + 1}
            </button>
          );
        })}
      </div>

     

      <button type="button" className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer
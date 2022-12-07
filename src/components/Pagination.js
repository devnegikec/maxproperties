import React from 'react'
import "../style/paginationStyle.css";

function Pagination({ totalCount }) {
  return (
    <div className='pagination'>
      <div className='page-details'>Viewing 1-{totalCount} of {totalCount} properties.</div>
      <div className='page-controls'>
        <div className="prev page-btn"></div>
        <div className="page-number">
          <input type="text" value="1"/>/1
        </div>
        <div className="next page-btn"></div>
      </div>
    </div>
  )
}

export default Pagination
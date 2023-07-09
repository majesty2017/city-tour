import Pagination from "react-js-pagination";

const Paginations = ({activePage, itemsCountPerPage, startFrom, totalItemsCount, onChange}) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="">
          <div
            className="dataTables_info"
            id="example2_info"
            role="status"
            aria-live="polite"
          >
            Showing {startFrom} to {itemsCountPerPage} of {totalItemsCount} entries
          </div>
        </div>
        <div className="">
          <div className="dataTables_paginate pagination-sm paging_simple_numbers" id="example2_paginate" >
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              onChange={onChange}
              nextPageText='Next'
              firstPageText='First'
              prevPageText='Previous'
              lastPageText='Last'
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        </div>
      </div>
    )
}

export default Paginations

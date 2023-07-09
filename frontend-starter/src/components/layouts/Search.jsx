import {Link} from "react-router-dom";

const Search = ({value, onClick, onChange}) => {
  return (
    <div className="card-header">
      <div className='d-flex justify-content-between align-items-center'>
        <div className="form-group">
          <label htmlFor="direction">Order By</label>
          <select
            className="custom-select form-select-sm form-control-border border-width-2"
            id="order_by"
            name="order_by"
            defaultValue={value.order_by}
            onChange={onChange}
          >
            <option>Order By</option>
            <option value='name'>Name</option>
            <option value='created_at'>Created at</option>
            <option value='updated_at'>Updated at</option>
            <option value='serial'>Serial</option>
            <option value='status'>Status</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="direction">Direction</label>
          <select
            className="custom-select form-select-sm form-control-border border-width-2"
            id="direction"
            name="direction"
            defaultValue={value.direction}
            onChange={onChange}
          >
            <option>Direction</option>
            <option value='asc'>ASC</option>
            <option value='desc'>DESC</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="per_page">Per Page</label>
          <select
            className="custom-select form-select-sm form-control-border border-width-2"
            id="per_page"
            name="per_page"
            defaultValue={value.per_page}
            onChange={onChange}
          >
            <option>Per Page</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
            <option value={5000}>All</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="search" className='pb-2'>Search</label>
          <input
            type="text"
            className="form-control form-control-sm form-control-border border-width-2"
            id="search"
            name="search"
            value={value.search}
            onChange={onChange}
            placeholder="Type your keywords here..."
          />
        </div>

        <button onClick={onClick} className='btn btn-outline-primary'><i className='fa fa-search'></i> Search</button>
      </div>
    </div>
  )
}

export default Search

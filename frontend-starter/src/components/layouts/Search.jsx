import {Link, useNavigate} from "react-router-dom";
import index               from "../../../public/assets/plugins/popper/popper-utils.js";

const Search = ({value, onClick, onChange, hasExtra, extras, onKeyUp, onKeyDown}) => {
  const navigate = useNavigate()
  const handleRefresh = () => {
    window.location.reload()
  }
  return (
    <div className="card-header ">
      <div className='d-flex justify-content-sm-between justify-content-between align-items-center'>
        <div className="form-group">
          <label htmlFor="direction">Order By</label>
          <select
            className="custom-select form-select-sm form-control-border border-width-2"
            id="order_by"
            name="order_by"
            defaultValue={value.order_by}
            onChange={onChange}
          >
            <option value=''>Order By</option>
            <option value='name'>Name</option>
            <option value='created_at'>Created at</option>
            <option value='updated_at'>Updated at</option>
            {hasExtra ? (
              <>
                {extras && extras.length > 0 && extras.map((extra, index) => (
                  <option value={extra.value} key={index}>{extra.name}</option>
                ))}
              </>
            ) : (
               <option value='serial'>Serial</option>
             )}
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
            <option value=''>Direction</option>
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
            <option value=''>Per Page</option>
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
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            placeholder="Type your keywords here..."
          />
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <button onClick={onClick} className='btn btn-outline-primary'><i className='fa fa-search'></i> Search</button>
          <Link to='' role='button' onClick={handleRefresh} className='btn btn-outline-primary ml-2'>
            <i className='fas fa-reply-all'></i> Refresh
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Search

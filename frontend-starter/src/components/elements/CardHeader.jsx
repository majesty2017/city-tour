import {Search} from "../index.js";
import {Link} from "react-router-dom";

const CardHeader = ({title, link, isForm, value, onChange}) => {
    return (
      <>
        {isForm ? (
          <div className="card-header">
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className="card-title">
                <i className='fas fa-plus-circle'></i> Add {title}
              </h3>
              <div className='d-flex justify-content-between align-items-center'>
                <Link to={link} className='btn btn-outline-primary'><i className='fas fa-list'></i> List</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-header">
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className="card-title">
                <i className='fas fa-list'></i> {title} List
              </h3>
              <Link to={link} className='btn btn-outline-primary ml-4'>Add New</Link>
            </div>
          </div>
        )}

      </>

    )
}

export default CardHeader

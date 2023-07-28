import {Search} from "../index.js";
import {Link} from "react-router-dom";

const CardHeader = ({title, label, link, isForm, isPopup, onClick, trash, trashLink}) => {
    return (
      <>
        {isForm ? (
          <div className="card-header">
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className="card-title">
                <i className='fas fa-plus-circle'></i> {title}
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
                <i className='fas fa-list'></i> {title}
              </h3>
              {isPopup ? (
                <button type='button' onClick={onClick} className='btn btn-outline-primary ml-4'><i className='fas fa-plus-circle'></i> Add New</button>
              ) : (
                <>
                  <div className='d-flex'>
                    {trash && (
                      <Link to={trashLink} className='btn btn-outline-primary ml-4'><i className='fas fa-trash'></i> Trash</Link>
                    )}
                    {link && (
                      <Link to={link} className='btn btn-outline-primary ml-4'><i className='fas fa-plus-circle'></i> {label ?? 'Add New'}</Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </>

    )
}

export default CardHeader

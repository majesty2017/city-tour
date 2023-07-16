import {Link} from "react-router-dom";
import handleDelete from "../../data/Sweetalert";

const ActionButton = ({url, id, modalView, modalEdit, onClick, handleDelete}) => {
    return (
        <>
            {modalView && (
              <Link role='button' className="text-info mr-2" onClick={onClick} to='#'>
                <i className="fas fa-eye font-weight-bold"/>
              </Link>
            )}

            {modalEdit && (
              <Link role='button' to='' className="text-warning mr-2" onClick={onClick}>
                <i className="fas fa-edit font-weight-bold"/>
              </Link>
            )}

          {!modalEdit && (
            <Link className="text-warning mr-2" to={`/${url}/${id}`}>
              <i className="fas fa-edit font-weight-bold"/>
            </Link>
          )}

            <Link role='button' className="text-danger mr-2" to=""
                  onClick={handleDelete}>
                <i className="fas fa-trash font-weight-bold"/>
            </Link>
        </>
    )
}

export default ActionButton

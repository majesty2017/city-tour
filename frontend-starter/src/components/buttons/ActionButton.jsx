import {Link} from "react-router-dom";
import handleDelete from "../../data/Sweetalert";

const ActionButton = ({url, id, view, onClick, handleDelete}) => {
    return (
        <>
            {view && (
              <Link role='button' to='' className="text-info mr-2" onClick={onClick}>
                <i className="fas fa-eye font-weight-bold"/>
              </Link>
            )}

            <Link className="text-warning mr-2" to={`/${url}/${id}`}>
                <i className="fas fa-edit font-weight-bold"/>
            </Link>

            <Link role='button' className="text-danger mr-2" to=""
                  onClick={handleDelete}>
                <i className="fas fa-trash font-weight-bold"/>
            </Link>
        </>
    )
}

export default ActionButton

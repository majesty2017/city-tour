import {Button, Modal} from "react-bootstrap";

const CategoryDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="category-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="category-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.category.photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.category.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.category.name}</td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{props.category.slug}</td>
            </tr>
            <tr>
              <td>Serial</td>
              <td>{props.category.serial}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.category.status}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{props.category.description}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.category.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.category.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.category.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default CategoryDetailsModal

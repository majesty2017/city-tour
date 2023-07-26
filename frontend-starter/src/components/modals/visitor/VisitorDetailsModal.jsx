import {Button, Modal} from "react-bootstrap";

const VisitorDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="visitor-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="visitor-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.visitor.photo} className='img-thumbnail rounded-lg' alt='Logo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.visitor.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.visitor.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.visitor.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{props.visitor.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{props.visitor.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.visitor.status}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.visitor.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.visitor.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.visitor.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default VisitorDetailsModal

import {Button, Modal} from "react-bootstrap";

const SupplierDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="supplier-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="supplier-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.supplier.logo} className='img-thumbnail rounded-lg' alt='Logo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.supplier.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.supplier.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.supplier.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{props.supplier.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{props.supplier.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.supplier.status}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.supplier.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.supplier.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.supplier.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default SupplierDetailsModal

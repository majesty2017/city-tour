import {Button, Modal} from "react-bootstrap";

const SalesManagerDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="salesManager-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="salesManager-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.salesManager.photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
              <td><img src={props.salesManager.nid_photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.salesManager.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.salesManager.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.salesManager.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{props.salesManager.phone}</td>
            </tr>
            <tr>
              <td>Shop</td>
              <td>{props.salesManager.shop}</td>
            </tr>
            <tr>
              <td>NID/Passport/Driver License</td>
              <td>{props.salesManager.nid_number}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{props.salesManager.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.salesManager.status}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.salesManager.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.salesManager.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.salesManager.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default SalesManagerDetailsModal

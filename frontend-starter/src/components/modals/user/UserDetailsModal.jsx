import {Button, Modal} from "react-bootstrap";

const UserDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="user-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="user-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.user.photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
              <td><img src={props.user.nid_photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.user.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.user.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{props.user.phone}</td>
            </tr>
            <tr>
              <td>NID/Passport/Driver License</td>
              <td>{props.user.nid_number}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{props.user.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.user.status}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.user.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.user.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.user.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default UserDetailsModal

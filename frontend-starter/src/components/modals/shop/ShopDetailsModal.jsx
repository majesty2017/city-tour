import {Button, Modal} from "react-bootstrap";

const ShopDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="shop-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="shop-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.shop.logo} className='img-thumbnail rounded-lg' alt='Logo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.shop.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.shop.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.shop.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{props.shop.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{props.shop.address}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.shop.status}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.shop.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.shop.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.shop.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default ShopDetailsModal

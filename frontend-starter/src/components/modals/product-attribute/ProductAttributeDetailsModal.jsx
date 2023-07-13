import {Button, Modal} from "react-bootstrap";

const ProductAttributeDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="productAttribute-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="productAttribute-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.productAttribute.logo} className='img-thumbnail rounded-lg' alt='Logo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.productAttribute.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.productAttribute.name}</td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{props.productAttribute.slug}</td>
            </tr>
            <tr>
              <td>Serial</td>
              <td>{props.productAttribute.serial}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.productAttribute.status}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{props.productAttribute.description}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.productAttribute.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.productAttribute.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.productAttribute.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default ProductAttributeDetailsModal

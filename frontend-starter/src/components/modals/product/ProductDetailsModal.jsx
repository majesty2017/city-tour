import {Button, Modal} from "react-bootstrap";

const ProductDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="product-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="product-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.product.photo} className='img-thumbnail rounded-lg' alt='Photo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.product.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.product.name}</td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{props.product.slug}</td>
            </tr>
            <tr>
              <td>Serial</td>
              <td>{props.product.serial}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.product.status}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{props.product.description}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.product.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.product.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.product.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default ProductDetailsModal

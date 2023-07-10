import {Button, Modal} from "react-bootstrap";

const BrandDetailsModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="brand-details-modal"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="brand-details-modal">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
            <tbody>
            <tr>
              <td><img src={props.brand.logo} className='img-thumbnail rounded-lg' alt='Logo'/></td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{props.brand.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{props.brand.name}</td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{props.brand.slug}</td>
            </tr>
            <tr>
              <td>Serial</td>
              <td>{props.brand.serial}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{props.brand.status}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{props.brand.description}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{props.brand.created_by}</td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{props.brand.created_at}</td>
            </tr>
            <tr>
              <td>Updated at</td>
              <td>{props.brand.updated_at}</td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
}

export default BrandDetailsModal

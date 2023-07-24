import {Button, Modal} from "react-bootstrap";

const VisitorLogoModal = (props) => {
    return (
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{display: "flex", justifyContent: 'space-between'}}>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
          <span onClick={props.onHide} style={{cursor: "pointer"}}><i className='fa fa-times'></i></span>
        </Modal.Header>
        <Modal.Body>
          <img src={props.logo} className='img-thumbnail rounded-lg' alt='Logo'/>
        </Modal.Body>
      </Modal>
    )
}

export default VisitorLogoModal

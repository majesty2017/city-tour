import {Button, DefaultModal} from "../../";
import React, {useState} from "react";
import axiosClient from "../../../axios-client.js";
import toastAlert from "../../../data/toastAlert.js";

const AddVisitorModal = (props) => {
  const [input, setInput] = useState({status: 1})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axiosClient.post('/visitors', input).then(res => {
      props.setModalShow(false)
      setInput({})
      setLoading(false);
      toastAlert(res.data.message)
    }).catch(err => {
      setLoading(false)
      console.log(err)
      if (err.response.status === 422) {
        setErrors(err.response.data.errors)
      }
    })
  }

    return (
        <DefaultModal show={props.show} onHide={props.onHide} title='Add Visitor'>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className='row'>
                <div className='col-sm-12'>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className={errors.name !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                      id="name"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter name"
                    />
                    <p className='text-danger'>
                      <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                    </p>
                  </div>
                </div>

                <div className='col-sm-12'>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className={errors.name !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                      id="phone"
                      name="phone"
                      value={input.phone}
                      onChange={handleInput}
                      placeholder="Enter phone"
                    />
                    <p className='text-danger'>
                      <small>{errors.phone !== undefined ? errors.phone[0] : null}</small>
                    </p>
                  </div>
                </div>

                <div className='col-sm-12'>
                  <div className="form-group">
                    <label htmlFor="phone">Email</label>
                    <input
                      type="email"
                      className={errors.email !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                      id="email"
                      name="email"
                      value={input.email}
                      onChange={handleInput}
                      placeholder="Enter email"
                    />
                    <p className='text-danger'>
                      <small>{errors.email !== undefined ? errors.email[0] : null}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <Button type='submit' label='Save' loading={loading} />
            </div>
          </form>
        </DefaultModal>
    )
}

export default AddVisitorModal

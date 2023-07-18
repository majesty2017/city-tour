import {CardHeader, DefaultLayout, Loader} from "../../../components";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import toastAlert from "../../../data/toastAlert";

const UserForm = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({status: 1})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [shops, setShops] = useState([])
  const [hasShop, setHasShop] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    const getShops = async () => {
      setLoading(true)
      await axiosClient.get(`/shops/list`).then(res => {
        setLoading(false)
        setShops(res.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
    }
    getShops()
  }, [])

  if (id) {
    useEffect(() => {const getUser = async () => {
      setLoading(true)
      await axiosClient.get(`/users/${id}`).then(res => {
        setLoading(false)
        console.log(res.data)
        setInput(res.data.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
    }
      getUser()
    }, [id])
  }

  const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))

  const handleLogo = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      setInput(prevState => ({...prevState, [e.target.name]: reader.result}))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const store = async () => {
      setLoading(true)
      await axiosClient.post('/users', input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/users')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    const update = async () => {
      setLoading(true)
      await axiosClient.put(`/users/${id}`, input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/users')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    if (id) {
      update()
    } else {
      store()
    }
  }

    return (
        <DefaultLayout title={id ? `Edit User` : 'Add User'}>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <CardHeader isForm title={id ? 'Edit User' : 'Add User'} link='/users' />
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          {/* general form elements */}
                          <div className="card card-primary">
                            {loading && <Loader />}
                            {!loading && (
                              <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                  <div className='row'>
                                    <div className='col-sm-6'>
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

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="name">Phone</label>
                                        <input
                                          type="text"
                                          className={errors.phone !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
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

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="role">
                                          Role
                                        </label>
                                        <select
                                          className="custom-select form-control-border border-width-2"
                                          id="role"
                                          name="role"
                                          defaultValue={input.role}
                                          value={input.role}
                                          placeholder='Select option'
                                          onChange={handleInput}
                                        >
                                          <option>Select option</option>
                                          <option value='is_admin'>Admin</option>
                                          <option value='is_manager'>Sales Manager</option>
                                        </select>
                                        <p className='text-danger'>
                                          <small>{errors.role !== undefined ? errors.role[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="nid_number">NID/Passport/Driver License</label>
                                        <input
                                          type="text"
                                          className={errors.nid_number !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                          id="nid_number"
                                          name="nid_number"
                                          value={input.nid_number}
                                          onChange={handleInput}
                                          placeholder="Enter NID/Passport/Driver License"
                                        />
                                        <p className='text-danger'>
                                          <small>{errors.nid_number !== undefined ? errors.nid_number[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    {hasShop && (
                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="shop_id">
                                            Shop
                                          </label>
                                          <select
                                            className="custom-select form-control-border border-width-2"
                                            id="shop_id"
                                            name="shop_id"
                                            defaultValue={input.shop_id}
                                            value={input.shop_id}
                                            placeholder='Select option'
                                            onChange={handleInput}
                                          >
                                            <option>Select option</option>
                                            {shops.map((shop, index) => (
                                              <option value={shop.id} key={index}>{shop.name}</option>
                                            ))}
                                          </select>
                                          <p className='text-danger'>
                                            <small>{errors.email !== undefined ? errors.email[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="email">Email</label>
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

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                          type="password"
                                          className={errors.password !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                          id="password"
                                          name="password"
                                          value={input.password}
                                          onChange={handleInput}
                                          placeholder="Enter password"
                                        />
                                        <p className='text-danger'>
                                          <small>{errors.password !== undefined ? errors.password[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    <div className="col-sm-6">
                                      <div className="form-group form-control-border border-width-2">
                                        <label>Address</label>
                                        <textarea
                                          className={errors.address !== undefined ?
                                            "form-control form-control-border border-width-2 is-invalid" :
                                            "form-control form-control-border border-width-2"}
                                          value={input.address}
                                          onChange={handleInput}
                                          name='address'
                                          rows="3"
                                          placeholder="Enter ..."
                                        ></textarea>
                                        <p className='text-danger'>
                                          <small>{errors.address !== undefined ? errors.address[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="gender">
                                          Gender
                                        </label>
                                        <select
                                          className="custom-select form-control-border border-width-2"
                                          id="gender"
                                          name="gender"
                                          defaultValue={input.gender}
                                          value={input.gender}
                                          placeholder='Select option'
                                          onChange={handleInput}
                                        >
                                          <option>Select option</option>
                                          <option value='Male'>Male</option>
                                          <option value='Female'>Female</option>
                                        </select>
                                        <p className='text-danger'>
                                          <small>{errors.gender !== undefined ? errors.gender[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="status">
                                          Status
                                        </label>
                                        <select
                                          className="custom-select form-control-border border-width-2"
                                          id="status"
                                          name="status"
                                          defaultValue={input.status}
                                          placeholder='Select option'
                                          onChange={handleInput}
                                        >
                                          <option value={1}>Active</option>
                                          <option value={0}>Inactive</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="photo">Photo</label>
                                        <div className="input-group">
                                          <div className="custom-file">
                                            <input
                                              type="file"
                                              className="custom-file-input"
                                              id="photo"
                                              name="photo"
                                              onChange={handleLogo}
                                            />
                                            <label className="custom-file-label" htmlFor="photo">
                                              Choose file
                                            </label>
                                          </div>
                                        </div>
                                        {input.photo != undefined || input.photo_preview != undefined  ? (
                                          <div className='mt-3 p-1'>
                                            <img src={input.photo == undefined ? input.photo_preview : input.photo} style={{width: 150, height: 200, objectFit: 'cover', borderRadius: 20}} alt="Photo" />
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="nid_photo">NID/Passport/Driver License</label>
                                        <div className="input-group">
                                          <div className="custom-file">
                                            <input
                                              type="file"
                                              className="custom-file-input"
                                              id="nid_photo"
                                              name="nid_photo"
                                              onChange={handleLogo}
                                            />
                                            <label className="custom-file-label" htmlFor="nid_photo">
                                              Choose file
                                            </label>
                                          </div>
                                        </div>
                                        {input.nid_photo != undefined || input.nid_photo_preview != undefined  ? (
                                          <div className='mt-3 p-1'>
                                            <img src={input.nid_photo == undefined ? input.nid_photo_preview : input.nid_photo} style={{width: 150, height: 200, objectFit: 'cover', borderRadius: 20}} alt="NID" />
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                  <button type="submit" className="btn btn-primary">
                                    {id ? 'Save Changes' : 'Save'}
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        </DefaultLayout>
    )
}

export default UserForm

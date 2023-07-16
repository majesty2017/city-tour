import {
  CardHeader,
  DefaultLayout,
  Loader,
  Search
}                  from "../../components";
import {
  Link,
  useNavigate,
  useParams
}                  from "react-router-dom";
import {
  useEffect,
  useState
}                  from "react";
import axiosClient from "../../axios-client";
import toastAlert  from "../../data/toastAlert";

const ShopForm = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({status: 1})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))

  const handleLogo = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      setInput(prevState => ({
        ...prevState, logo: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const getShop = async () => {
      setLoading(true)
      await axiosClient.get(`/shops/${id}`).then(res => {
        setLoading(false)
        setInput(res.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
    }
    getShop()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const store = async () => {
      setLoading(true)
      await axiosClient.post('/shops', input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/shops')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    const update = async () => {
      setLoading(true)
      await axiosClient.put(`/shops/${id}`, input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/shops')
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
    <DefaultLayout title={id ? `Edit Shop` : 'Add Shop'}>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader isForm title={id ? 'Edit Shop' : 'Add Shop'} link='/shops'/>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      {/* general form elements */}
                      <div className="card card-primary">
                        {loading && <Loader/>}
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
                                    <label htmlFor="logo">Logo</label>
                                    <div className="input-group">
                                      <div className="custom-file">
                                        <input
                                          type="file"
                                          className="custom-file-input"
                                          id="logo"
                                          name="logo"
                                          onChange={handleLogo}
                                        />
                                        <label className="custom-file-label" htmlFor="logo">
                                          Choose file
                                        </label>
                                      </div>
                                    </div>
                                    {input.logo != undefined || input.logo_preview != undefined ? (
                                      <div className='mt-3 p-1'>
                                        <img src={input.logo == undefined ? input.logo_preview : input.logo}
                                             style={{width: 150, height: 200, objectFit: 'cover', borderRadius: 20}}
                                             alt="Logo"/>
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

export default ShopForm

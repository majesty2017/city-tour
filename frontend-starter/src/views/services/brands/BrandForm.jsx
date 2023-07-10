import {CardHeader, DefaultLayout, Loader, Search} from "../../../components";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import toastAlert from "../../../data/toastAlert.js";

const BrandForm = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({status: 1})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  const getBrand = async () => {
    setLoading(true)
    await axiosClient.get(`/brands/${id}`).then(res => {
      setLoading(false)
      setInput(res.data)
      console.log('brsnd', res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    getBrand()
  }, [])

  const handleInput = (e) => {
    if (e.target.name === 'name') {
      let slug = e.target.value
      slug = slug.toLowerCase()
      slug = slug.replaceAll(' ', '-')
      setInput(prevState => ({
        ...prevState, slug: slug
      }))
    }
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const store = async () => {
      setLoading(true)
      await axiosClient.post('/brands', input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/brands')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }
    const update = async () => {
      setLoading(true)
      await axiosClient.put(`/brands/${id}`, input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/brands')
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
        <DefaultLayout title={id ? `Edit Brand` : 'Add Supplier'}>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <CardHeader isForm title={id ? 'Edit Supplier' : 'Add Supplier'} link='/brands' />
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
                                        <label htmlFor="slug">Slug</label>
                                        <input
                                          type="text"
                                          className={errors.slug !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                          id="slug"
                                          name="slug"
                                          value={input.slug}
                                          onChange={handleInput}
                                          placeholder="Enter slug"
                                        />
                                        <p className='text-danger'>
                                          <small>{errors.slug !== undefined ? errors.slug[0] : null}</small>
                                        </p>
                                      </div>
                                    </div>

                                    <div className='col-sm-6'>
                                      <div className="form-group">
                                        <label htmlFor="serial">Serial</label>
                                        <input
                                          type="number"
                                          className={errors.serial !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                          id="serial"
                                          name="serial"
                                          value={input.serial}
                                          onChange={handleInput}
                                          placeholder="Enter serial"
                                        />
                                        <p className='text-danger'>
                                          <small>{errors.serial !== undefined ? errors.serial[0] : null}</small>
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
                                        <label>Description</label>
                                        <textarea className="form-control" value={input.description} onChange={handleInput} name='description' rows="3" placeholder="Enter ..."></textarea>
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
                                        {input.logo != undefined || input.logo_preview != undefined  ? (
                                          <div className='mt-3 p-1'>
                                            <img src={input.logo == undefined ? input.logo_preview : input.logo} style={{width: 150, height: 200, objectFit: 'cover', borderRadius: 20}} alt="Logo" />
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

export default BrandForm

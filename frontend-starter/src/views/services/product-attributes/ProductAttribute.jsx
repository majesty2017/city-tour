import {
  ActionButton,
  CardHeader,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search, ProductAttributeDetailsModal,
  ProductAttributeLogoModal, DefaultModal
} from "../../../components";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import Swal from "sweetalert2";
import toastAlert from "../../../data/toastAlert.js";
import {useParams} from "react-router-dom";

const ProductAttribute = () => {
  const [loading, setLoading] = useState(false)
  const [productAttributes, setProductAttributes] = useState([])
  const [errors, setErrors] = useState([])
  const {id} = useParams()

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalValueShow, setModalValueShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add');
  const [modalValueTitle, setModalValueTitle] = useState('Add');
  const [modalButton, setModalButton] = useState('Save');
  const [editMode, setEditMode] = useState(false);
  const [modalValue, setModalValue] = useState([]);
  const [modalValueShowDetail, setModalValueShowDetail] = useState(false);

  const [attribute, setAttribute] = useState([]);
  const [input, setInput] = useState({})

  const handleShowModal = (attribute = undefined) => {
    setInput({status: 1})
    if (attribute != undefined) {
      setModalTitle('Update')
      setModalButton('Save Changes')
      setEditMode(true)
      setInput({
        id: attribute.id,
        status: attribute.original_status,
        name: attribute.name,
      })
    } else {
      setModalTitle('Add')
      setModalButton('Save')
      setEditMode(false)
    }
    setModalShow(true)
    setErrors([])
  }

  const getProductAttributes = async (pageNumber = 1) => {
    setLoading(true)
    await axiosClient.get(`attributes?page=${pageNumber}`).then(res => {
      setLoading(false)
      setInput({status: 1})
      setProductAttributes(res.data.data)
      setItemsCountPerPage(res.data.meta.per_page)
      setStartFrom(res.data.meta.from)
      setTotalItemsCount(res.data.meta.total)
      setActivePage(res.data.meta.current_page)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    getProductAttributes()
  }, [])

  const handleInput = (e) => {
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const store = async () => {
      setEditMode(false)
      setLoading(true)
      await axiosClient.post('/attributes', input).then(res => {
        getProductAttributes()
        setModalShow(false)
        setLoading(false)
        toastAlert(res.data.message)
        setErrors([])
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }
    const update = async () => {
      setEditMode(true)
      setLoading(true)
      await axiosClient.put(`/attributes/${input.id}`, input).then(res => {
        setModalShow(false)
        toastAlert(res.data.message)
        getProductAttributes()
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    if (editMode) {
      update()
    } else {
      store()
    }
  }

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axiosClient.delete(`/attributes/${id}`).then(res => {
          setLoading(false)
          toastAlert('Attribute deleted successfully')
          getProductAttributes()
        }).catch(err => {
          setLoading(false)
          console.log(err)
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }

  const handleValueDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axiosClient.delete(`/value/${id}`).then(res => {
          setLoading(false)
          toastAlert('Value deleted successfully')
          getProductAttributes()
        }).catch(err => {
          setLoading(false)
          console.log(err)
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }

  const handleValueCreateModal = (id) => {
    setEditMode(false)
    setModalValueShow(true)
    setModalValueTitle('Add')
    setInput({status: 1, attribute_id: id})
  }

  const handleValueUpdateModal = (value) => {
    setInput({status: 1})
    if (value != undefined) {

      setEditMode(true)
      setModalValueShow(true)
      setModalValueTitle('Update')
      setModalButton('Save Changes')
      setInput({
        id: value.id,
        status: value.original_status,
        name: value.name,
      })
    } else {
      setModalValueTitle('Add')
      setModalButton('Save')
      setEditMode(false)
    }
    setModalValueShow(true)
    setErrors([])
  }

  const handleValueCreate = (e) => {
    e.preventDefault()
    const store = async () => {
      setEditMode(false)
      await axiosClient.post('/value', input).then(res => {
        getProductAttributes()
        setModalValueShow(false)
        setLoading(false)
        toastAlert(res.data.message)
        setErrors([])
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }
    const update = async () => {
      setEditMode(true)
      await axiosClient.put(`/value/${input.id}`, input).then(res => {
        getProductAttributes()
        setModalValueShow(false)
        setLoading(false)
        toastAlert(res.data.message)
        setErrors([])
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    if (editMode) {
      update()
    } else {
      store()
    }
  }

  const handleValueDetailsModal = (value) => {
    setModalValueShowDetail(true)
    setModalValue(value)
  }

  return (
    <DefaultLayout title='Product Attribute'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Product Attribute List' isPopup onClick={() => handleShowModal()}/>
                <div className="card-body">
                  <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                      <div className="col-sm-12 col-md-6"/>
                      <div className="col-sm-12 col-md-6"/>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        {loading && (<Loader/>)}
                        {!loading && (
                          <>
                            <table className="table table-borderless table-hover dataTable dtr-inline table-striped">
                              <thead>
                              <tr>
                                <th
                                  className="sorting sorting_asc"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label="Rendering engine: activate to sort column descending"
                                >
                                  SL
                                </th>
                                <th
                                  className="sorting sorting_asc"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label="Rendering engine: activate to sort column descending"
                                >
                                  Name
                                </th>
                                <th
                                  className="sorting sorting_asc"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label="Rendering engine: activate to sort column descending"
                                >
                                  Value
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Created By
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Status
                                </th>

                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Date Time
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Action
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              {Object.keys(productAttributes).length > 0 ? productAttributes.map((attribute, index) => (
                                <tr key={index}>
                                  <td>{startFrom + index}</td>
                                  <td className="dtr-control" tabIndex={index}>{attribute.name}</td>
                                  <td className='text-center'>
                                    <div className='main-container'>
                                      {attribute.value != undefined && attribute.value.map((value, valIndex) => (
                                        <div className='value-container' key={valIndex}>
                                          {value.name}
                                          <div className='value-button'>
                                            <button onClick={() => handleValueDetailsModal(value)} className='btn-info'>
                                              <i className='fa fa-eye'></i></button>
                                            <button onClick={() => handleValueUpdateModal(value)} className='btn-warning'><i className='fa fa-edit'></i></button>
                                            <button onClick={() => handleValueDelete(value.id)} className='btn-danger'><i className='fa fa-trash'></i></button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <button className='btn btn-xs btn-primary'
                                            onClick={() => handleValueCreateModal(attribute.id)}>
                                      <i className='fa fa-plus'></i>
                                    </button>
                                  </td>
                                  <td>{attribute.created_by}</td>
                                  <td>{attribute.status}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {attribute.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {attribute.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='attributes'
                                      id={attribute.id}
                                      handleDelete={() => handleDelete(attribute.id)}
                                      modalEdit
                                      onClick={() => handleShowModal(attribute)}
                                    />
                                  </td>
                                </tr>
                              )) : (
                                <NoDataFound title='Attribute'/>
                              )}
                              </tbody>
                            </table>
                          </>
                        )}
                      </div>
                    </div>

                    <DefaultModal show={modalValueShow} onHide={() => setModalValueShow(false)} title={`${modalValueTitle} Attribute Value`} >
                      <div className="row">
                        <div className="col-md-12">
                          {/* general form elements */}
                          <div className="card card-primary">
                            {loading && <Loader/>}
                            {!loading && (
                              <form onSubmit={handleValueCreate}>
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
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                  <button type="submit" className="btn btn-primary">
                                    {modalButton}
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    </DefaultModal
                    >

                    <DefaultModal show={modalValueShowDetail} onHide={() => setModalValueShowDetail(false)} title={`Value Details`}>
                      <div className="row">
                        <div className="col-md-12">
                          {/* general form elements */}
                          <div className="card card-primary">
                            {loading && <Loader/>}
                            {!loading && (
                              <table className='table table-bordered table-hover table-striped'>
                                <tbody>
                                <tr>
                                  <th>ID</th>
                                  <td>{modalValue.id}</td>
                                </tr>
                                <tr>
                                  <th>Name</th>
                                  <td>{modalValue.name}</td>
                                </tr>
                                <tr>
                                  <th>Status</th>
                                  <td>{modalValue.status}</td>
                                </tr>
                                <tr>
                                  <th>Created By</th>
                                  <td>{modalValue.created_by}</td>
                                </tr>
                                <tr>
                                  <th>Created At</th>
                                  <td>{modalValue.created_at}</td>
                                </tr>
                                <tr>
                                  <th>Updated At</th>
                                  <td>{modalValue.updated_at}</td>
                                </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    </DefaultModal
                    >

                    <DefaultModal show={modalShow} onHide={() => setModalShow(false)} title={`${modalTitle} Product Attribute`}>
                      <div className="row">
                        <div className="col-md-12">
                          {/* general form elements */}
                          <div className="card card-primary">
                            {loading && <Loader/>}
                            {!loading && (
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
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                  <button type="submit" className="btn btn-primary">
                                    {modalButton}
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    </DefaultModal
                    >

                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getProductAttributes}
                      startFrom={startFrom}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
      </section>
    </DefaultLayout>
  )
}

export default ProductAttribute

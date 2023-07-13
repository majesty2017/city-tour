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

const ProductAttribute = () => {
  const [loading, setLoading] = useState(false)
  const [productAttributes, setProductAttributes] = useState([])
  const [errors, setErrors] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDefault, setModalShowDefault] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalLogo, setModalLogo] = useState('');
  const [productAttribute, setProductAttribute] = useState([]);
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })

  const handleShowModal = () => {
    setModalShowDefault(true)
  }

  const handleLogoModal = (logo) => {
    setModalLogo(logo)
    setModalShow(true)
  }

  const handleDetailsModal = (productAttribute) => {
    setProductAttribute(productAttribute)
    setModalShowDetails(true)
  }
  const getProductAttributes = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`product-attributes?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
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
      setLoading(true)
      await axiosClient.post('/product-attributes', input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/product-attributes')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }
    const update = async () => {
      setLoading(true)
      await axiosClient.put(`/product-attributes/${id}`, input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/product-attributes')
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
        axiosClient.delete(`/product-attributes/${id}`).then(res => {
          setLoading(false)
          swalWithBootstrapButtons.fire(
            'Deleted!',
            res.message,
            'success'
          )
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

    return (
      <DefaultLayout title='Product Attribute'>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <CardHeader title='Product Attribute List' isPopup onClick={handleShowModal}/>
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
                              <Search value={input} onClick={() => getProductAttributes(1)} onChange={handleInput}/>
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
                                    Name / Slug
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Browser: activate to sort column ascending"
                                  >
                                    Serial / Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Platform(s): activate to sort column ascending"
                                  >
                                    Logo
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Engine version: activate to sort column ascending"
                                  >
                                    Created By
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
                                {Object.keys(productAttributes).length > 0 ? productAttributes.map((productAttribute, index) => (
                                  <tr key={index}>
                                    <td>{activePage + index}</td>
                                    <td className="dtr-control" tabIndex={index}>
                                      <div>
                                        <div className='text-primary'>Name: {productAttribute.name}</div>
                                        <div className='text-info'>Slug: {productAttribute.slug}</div>
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <div className='text-primary'>Serial: {productAttribute.serial}</div>
                                        <div className='text-info'>Status: {productAttribute.status}</div>
                                      </div>
                                    </td>
                                    <td>
                                      <Images width={32} height={32} src={productAttribute.logo} alt={productAttribute.name}
                                              onClick={() => handleLogoModal(productAttribute.logo_full)}/>
                                    </td>
                                    <td>{productAttribute.created_by}</td>
                                    <td>
                                      <div>
                                        <div className='text-primary'><small>Created: {productAttribute.created_at}</small></div>
                                        <div className='text-info'><small>Updated: {productAttribute.updated_at}</small></div>
                                      </div>
                                    </td>
                                    <td>
                                      <ActionButton
                                        url='productAttributes'
                                        id={productAttribute.id}
                                        handleDelete={() => handleDelete(productAttribute.id)}
                                        onClick={() => handleDetailsModal(productAttribute)}
                                        view />
                                    </td>
                                  </tr>
                                )): (
                                  <NoDataFound title='Product Attribute' />
                                )}
                                </tbody>
                                <tfoot>
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
                                    Serial / Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Browser: activate to sort column ascending"
                                  >
                                    Serial / Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Platform(s): activate to sort column ascending"
                                  >
                                    Logo
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="example2"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Engine version: activate to sort column ascending"
                                  >
                                    Created By
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
                                </tfoot>
                              </table>
                            </>
                          )}
                        </div>
                      </div>

                      <DefaultModal
                        show={modalShowDefault}
                        onHide={() => setModalShowDefault(false)}
                        title="Add Product Attribute">
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
                      </DefaultModal>

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

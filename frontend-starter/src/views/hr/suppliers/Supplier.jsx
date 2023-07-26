import {
  ActionButton,
  BrandDetailsModal,
  BrandLogoModal,
  CardHeader,
  DataTables,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search,
  SupplierDetailsModal,
  SupplierLogoModal
} from "../../../components";
import {Link} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import endpoint from "../../../data/server";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import Swal from "sweetalert2";
import toastAlert from "../../../data/toastAlert.js";

const Supplier = () => {
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalLogo, setModalLogo] = useState('');
  const [supplier, setSupplier] = useState([]);
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })

  const handleLogoModal = (logo) => {
    setModalLogo(logo)
    setModalShow(true)
  }

  const handleDetailsModal = (supplier) => {
    setSupplier(supplier)
    setModalShowDetails(true)
  }

  const getSuppliers = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`suppliers?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setSuppliers(res.data.data)
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
    getSuppliers()
  }, [])

  const handleInput = (e) => {
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
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
        axiosClient.delete(`/suppliers/${id}`).then(res => {
          setLoading(false)
          toastAlert(res.data.message)
          getSuppliers()
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
    <DefaultLayout title='Suppliers'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Suppliers List' link='/suppliers/create'/>
                <div className="card-body">
                  <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                      <div className="col-sm-12 col-md-6"/>
                      <div className="col-sm-12 col-md-6"/>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        {loading && (<Loader/>)}
                        <Search value={input}
                                onClick={() => getSuppliers(1)}
                                onKeyDown={() => getSuppliers(1)}
                                onKeyUp={() => getSuppliers(1)}
                                onChange={handleInput}/>
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
                                  Name / Email
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Phone
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Company
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
                                  By
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="CSS grade: activate to sort column ascending"
                                >
                                  Date/Time
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
                              {Object.keys(suppliers).length > 0 ? suppliers.map((supplier, index) => (
                                <tr key={index}>
                                  <td className="dtr-control" tabIndex={index}>{activePage + index}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Name: {supplier.name}</small></div>
                                      <div className='text-info'><small>Email: {supplier.email}</small></div>
                                    </div>
                                  </td>
                                  <td>{supplier.phone}</td>
                                  <td>{supplier.company_name}</td>
                                  <td>{supplier.status}</td>
                                  <td>
                                    <Images width={32} height={32} src={supplier.logo} alt={supplier.name}
                                            onClick={() => handleLogoModal(supplier.logo_full)}/>
                                  </td>
                                  <td>{supplier.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {supplier.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {supplier.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='suppliers'
                                      id={supplier.id}
                                      handleDelete={() => handleDelete(supplier.id)}
                                      onClick={() => handleDetailsModal(supplier)}
                                      webEdit
                                      modalView />
                                  </td>
                                </tr>
                              )): (
                                <NoDataFound title='Supplier' />
                              )}
                              </tbody>
                            </table>
                          </>
                          )}
                      </div>
                    </div>
                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getSuppliers}
                      startFrom={startFrom}
                    />
                  </div>
                  <SupplierLogoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Supplier Logo"
                    size
                    logo={modalLogo}
                  />
                  <SupplierDetailsModal
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    title="Supplier Details"
                    size
                    supplier={supplier}
                  />
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

export default Supplier

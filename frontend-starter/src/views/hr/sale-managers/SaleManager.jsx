import {
  ActionButton,
  CardHeader,
  DataTables,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search,
  SalesManagerDetailsModal,
  SalesManagerLogoModal
} from "../../../components";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import Swal from "sweetalert2";
import toastAlert from "../../../data/toastAlert.js";

const SaleManager = () => {
  const [loading, setLoading] = useState(false)
  const [salesManagers, setSalesManagers] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [saleManager, setSaleManager] = useState([]);
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })

  const handleLogoModal = (logo) => {
    setModalPhoto(logo)
    setModalShow(true)
  }

  const handleDetailsModal = (salesManager) => {
    setSaleManager(salesManager)
    setModalShowDetails(true)
  }

  const getSalesManagers = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`sales-manager?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      setSalesManagers(res.data.data)
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
    getSalesManagers()
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
        axiosClient.delete(`/users/${id}`).then(res => {
          setLoading(false)
          toastAlert(res.data.message)
          getSalesManagers()
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
    <DefaultLayout title='Sales Managers'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Sales Manager List' link='/users/create'/>
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
                            <Search value={input} onClick={() => getSalesManagers(1)} onChange={handleInput}/>
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
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Phone / Email
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
                                  Photo
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
                              {salesManagers && Object.keys(salesManagers).length > 0 ? salesManagers.map((salesManager, index) => (
                                <tr key={index}>
                                  <td className="dtr-control" tabIndex={index}>{activePage + index}</td>
                                  <td>{salesManager.name}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Phone: {salesManager.phone}</small></div>
                                      <div className='text-info'><small>Email: {salesManager.email}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Status: {salesManager.status}</small></div>
                                      <div className='text-info d-none'><small>Shop: {salesManager.shop}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <Images width={32} height={32} src={salesManager.photo} alt={salesManager.name}
                                            onClick={() => handleLogoModal(salesManager.photo_full)}/>
                                  </td>
                                  <td>{salesManager.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {salesManager.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {salesManager.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='users'
                                      id={salesManager.id}
                                      handleDelete={() => handleDelete(salesManager.id)}
                                      onClick={() => handleDetailsModal(salesManager)}
                                      modalView />
                                  </td>
                                </tr>
                              )): (
                                <NoDataFound title='Sales Manager' />
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
                      onChange={getSalesManagers}
                      startFrom={startFrom}
                    />
                  </div>
                  <SalesManagerLogoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Sales Manager Logo"
                    size
                    photo={modalPhoto}
                  />
                  <SalesManagerDetailsModal
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    title="Sales Manager Details"
                    size='lg'
                    salesManager={saleManager}
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

export default SaleManager

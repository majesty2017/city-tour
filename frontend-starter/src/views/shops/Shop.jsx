
import {Link}      from "react-router-dom";
import useFetch    from "../../hooks/useFetch";
import endpoint    from "../../data/server";
import {
  useEffect,
  useState
}                  from "react";
import axiosClient from "../../axios-client";
import Swal                                                                           from "sweetalert2";
import {
  ActionButton,
  CardHeader,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search,
  ShopDetailsModal,
  ShopLogoModal
} from "../../components";
import toastAlert from "../../data/toastAlert.js";

const Shop = () => {
  const [loading, setLoading] = useState(false)
  const [shops, setShops] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalLogo, setModalLogo] = useState('');
  const [shop, setShop] = useState([]);
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

  const handleDetailsModal = (shop) => {
    setShop(shop)
    setModalShowDetails(true)
  }

  const getShops = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`shops?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setShops(res.data.data)
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
    getShops()
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
        axiosClient.delete(`/shops/${id}`).then(res => {
          setLoading(false)
          toastAlert(res.data.message)
          getShops()
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
    <DefaultLayout title='Shops'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Shops List' link='/shops/create'/>
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
                            <Search value={input} onClick={() => getShops(1)} onChange={handleInput}/>
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
                                  Company Name
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
                              {Object.keys(shops).length > 0 ? shops.map((shop, index) => (
                                <tr key={index}>
                                  <td className="dtr-control" tabIndex={index}>{activePage + index}</td>
                                  <td>{shop.name}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Phone: {shop.phone}</small></div>
                                      <div className='text-info'><small>Email: {shop.email}</small></div>
                                    </div>
                                  </td>
                                  <td>{shop.status}</td>
                                  <td>
                                    <Images width={32} height={32} src={shop.logo} alt={shop.name}
                                            onClick={() => handleLogoModal(shop.logo_full)}/>
                                  </td>
                                  <td>{shop.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {shop.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {shop.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='shops'
                                      id={shop.id}
                                      handleDelete={() => handleDelete(shop.id)}
                                      onClick={() => handleDetailsModal(shop)}
                                      modalView
                                    />
                                  </td>
                                </tr>
                              )) : (
                                 <NoDataFound title='Shop'/>
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
                      onChange={getShops}
                      startFrom={startFrom}
                    />
                    <ShopLogoModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      title="Shop Logo"
                      size
                      logo={modalLogo}
                    />
                    <ShopDetailsModal
                      show={modalShowDetails}
                      onHide={() => setModalShowDetails(false)}
                      title="Shop Details"
                      size
                      shop={shop}
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

export default Shop

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
  Search
} from "../../../components";
import {Link} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import endpoint from "../../../data/server";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import Swal from "sweetalert2";

const Brand = () => {
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalLogo, setModalLogo] = useState('');
  const [brand, setBrand] = useState([]);
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

  const handleDetailsModal = (brand) => {
    setBrand(brand)
    setModalShowDetails(true)
  }
  const getBrands = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`brands?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setBrands(res.data.data)
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
    getBrands()
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
        axiosClient.delete(`/brands/${id}`).then(res => {
          setLoading(false)
          swalWithBootstrapButtons.fire(
            'Deleted!',
            res.message,
            'success'
          )
          getBrands()
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
    <DefaultLayout title='Brands'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Brand List' link='/brands/create'/>
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
                            <Search value={input} onClick={() => getBrands(1)} onChange={handleInput}/>
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
                              {Object.keys(brands).length > 0 ? brands.map((brand, index) => (
                                <tr key={index}>
                                  <td>{activePage + index}</td>
                                  <td className="dtr-control" tabIndex={index}>
                                    <div>
                                      <div className='text-primary'>Name: {brand.name}</div>
                                      <div className='text-info'>Slug: {brand.slug}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'>Serial: {brand.serial}</div>
                                      <div className='text-info'>Status: {brand.status}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <Images width={32} height={32} src={brand.logo} alt={brand.name}
                                            onClick={() => handleLogoModal(brand.logo_full)}/>
                                  </td>
                                  <td>{brand.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {brand.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {brand.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='brands'
                                      id={brand.id}
                                      handleDelete={() => handleDelete(brand.id)}
                                      onClick={() => handleDetailsModal(brand)}
                                      view />
                                  </td>
                                </tr>
                              )): (
                                <NoDataFound title='Brand' />
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
                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getBrands}
                      startFrom={startFrom}
                    />
                  </div>
                  <BrandLogoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Brand Logo"
                    size
                    logo={modalLogo}
                  />
                  <BrandDetailsModal
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    title="Brand Details"
                    size
                    brand={brand}
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

export default Brand

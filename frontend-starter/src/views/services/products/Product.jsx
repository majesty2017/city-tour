import {
  ActionButton,
  CardHeader,
  ProductDetailsModal,
  ProductPhotoModal,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search
} from "../../../components";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import Swal from "sweetalert2";
import toastAlert from "../../../data/toastAlert.js";

const Product = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [product, setProduct] = useState([]);
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })

  const handlePhotoModal = (photo) => {
    setModalPhoto(photo)
    setModalShow(true)
  }

  const handleDetailsModal = (Product) => {
    setProduct(Product)
    setModalShowDetails(true)
  }
  const getProducts = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`products?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setProducts(res.data.data)
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
    getProducts()
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
        axiosClient.delete(`/products/${id}`).then(res => {
          setLoading(false)
          toastAlert(res.message)
          getProducts()
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
        <DefaultLayout title='Products'>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <CardHeader title='Product List' link='/products/create' />
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
                                <Search value={input} onClick={() => getProducts(1)} onChange={handleInput}/>
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
                                  {Object.keys(products).length > 0 ? products.map((Product, index) => (
                                    <tr key={index}>
                                      <td>{activePage + index}</td>
                                      <td className="dtr-control" tabIndex={index}>
                                        <div>
                                          <div className='text-primary'>Name: {Product.name}</div>
                                          <div className='text-info'>Slug: {Product.slug}</div>
                                        </div>
                                      </td>
                                      <td>
                                        <div>
                                          <div className='text-primary'>Serial: {Product.serial}</div>
                                          <div className='text-info'>Status: {Product.status}</div>
                                        </div>
                                      </td>
                                      <td>
                                        <Images width={32} height={32} src={Product.photo} alt={Product.name}
                                                onClick={() => handlePhotoModal(Product.photo_full)}/>
                                      </td>
                                      <td>{Product.created_by}</td>
                                      <td>
                                        <div>
                                          <div className='text-primary'><small>Created: {Product.created_at}</small></div>
                                          <div className='text-info'><small>Updated: {Product.updated_at}</small></div>
                                        </div>
                                      </td>
                                      <td>
                                        <ActionButton
                                          url='products'
                                          id={Product.id}
                                          handleDelete={() => handleDelete(Product.id)}
                                          onClick={() => handleDetailsModal(Product)}
                                          view />
                                      </td>
                                    </tr>
                                  )): (
                                    <NoDataFound title='Product' />
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
                          onChange={getProducts}
                          startFrom={startFrom}
                        />
                      </div>
                      <ProductPhotoModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        title="Product Photo"
                        size
                        photo={modalPhoto}
                      />
                      <ProductDetailsModal
                        show={modalShowDetails}
                        onHide={() => setModalShowDetails(false)}
                        title="Product Details"
                        size
                        product={product}
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

export default Product

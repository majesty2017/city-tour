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
}                            from "../../../components";
import {useEffect, useState} from "react";
import axiosClient           from "../../../axios-client";
import Swal                  from "sweetalert2";
import toastAlert            from "../../../data/toastAlert";
import {search}              from "../../../constants/products";

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
          toastAlert(res.data.message)
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
                <CardHeader title='Product List' link='/products/create'/>
                <div className="card-body">
                  <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                      <div className="col-sm-12 col-md-6"/>
                      <div className="col-sm-12 col-md-6"/>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 table-responsive-sm">
                        {loading && (<Loader/>)}
                        {!loading && (
                          <>
                            <Search
                              value={input}
                              onClick={() => getProducts(1)}
                              hasExtra
                              // extras={search}
                              onChange={handleInput}
                            />
                            <table className="table table-borderless table-sm table-hover dataTable dtr-inline table-striped">
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
                                  Price
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
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Category
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
                              {Object.keys(products).length > 0 ? products.map((product, index) => (
                                <tr key={index}>
                                  <td>{activePage + index}</td>
                                  <td className="dtr-control" tabIndex={index}>
                                    <div>
                                      <div className='text-primary'>Name: {product.name}</div>
                                      <div className='text-info'>Slug: {product.slug}</div>
                                      <div className='text-info'>
                                        {product.attributes != undefined && Object.keys(product.attributes).length > 0 &&
                                         product.attributes.map((attribute, index) => (
                                           <div><small>{attribute.name}: {attribute.value}</small></div>
                                         ))
                                        }
                                      </div>
                                      <small className='text-primary'>Supplier: {product.supplier}</small>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><strong>Selling Price:
                                        {product.selling_price.currency}{product.selling_price.price} | Discount: {product.selling_price.discount}
                                      </strong> </div>
                                      <div className='text-info'>Discount: {product.discount_percent} + {product.discount_fixed}</div>
                                      <div className='text-primary'>Cost: {product.cost}</div>
                                      <div className='text-info'>Discount Start: {product.discount_start}</div>
                                      <small className='text-danger'>Discount End: {product.discount_end}</small>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'>Status: {product.status}</div>
                                      <div className='text-info'>SKU: {product.sku}</div>
                                      <div className='text-primary'>Stock: {product.stock}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <td>
                                      <div>
                                        <div className='text-primary'>Category: {product.category}</div>
                                        <div className='text-info'>Sub Category: {product.sub_category}</div>
                                        <div className='text-primary'>Brand: {product.brand}</div>
                                      </div>
                                    </td>
                                  </td>
                                  <td>
                                    <Images width={32} height={32} src={product.primary_photo} alt={product.name} />
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {product.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {product.updated_at}</small></div>
                                      <div className='text-primary'><small>Created By: {product.created_by}</small></div>
                                      <div className='text-info'><small>Updated By: {product.updated_by}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='products'
                                      id={product.id}
                                      handleDelete={() => handleDelete(product.id)}
                                      modalView
                                    />
                                  </td>
                                </tr>
                              )) : (
                                 <NoDataFound title='Product'/>
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

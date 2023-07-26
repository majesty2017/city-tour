import {
  ActionButton,
  CardHeader,
  DataTables,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search
} from "../../components";
import {Link} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import endpoint from "../../data/server";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";
import toastAlert from "../../data/toastAlert";
import useNumberFormat from "../../hooks/useNumberFormat.js";

const Order = () => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [order, setOrder] = useState([]);
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

  const handleDetailsModal = (category) => {
    setOrder(category)
    setModalShowDetails(true)
  }
  const getOrders = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`orders?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setOrders(res.data.data)
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
    getOrders()
  }, [])

  const handleInput = (e) => {
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  return (
    <DefaultLayout title='Tickets'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Ticket List' link='/orders/create' />
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
                            <Search value={input} onClick={() => getOrders(1)} onChange={handleInput}/>
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
                                      Order Details
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="example2"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Browser: activate to sort column ascending"
                                    >
                                      Visitor
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="example2"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Platform(s): activate to sort column ascending"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="example2"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Engine version: activate to sort column ascending"
                                    >
                                      Sold By
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="example2"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Engine version: activate to sort column ascending"
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
                                  {orders && Object.keys(orders).length > 0 ? orders.map((order, index) => (
                                    <tr key={index}>
                                      <td className="dtr-control" tabIndex={index}>{activePage + index}</td>
                                      <td>
                                        <div>
                                          <div className='text-primary'><small>Order: {order.order_number}</small></div>
                                          <div className='text-primary'><small>Order Status: {order.order_status_string}</small></div>
                                          <div className='text-primary'><small>Payment Status: {order.payment_status}</small></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div>
                                          <div className='text-primary'><small>Name: {order.visitor_name}</small></div>
                                          <div className='text-info'><small>Phone: {order.visitor_phone}</small></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div>
                                          <div className='text-primary'><small>Quantity: {order.quantity}</small></div>
                                          <div className='text-info'><small>Sub Total: {useNumberFormat(order.sub_total)}</small></div>
                                          <div className='text-primary'><small>Discount: {useNumberFormat(order.discount)}</small></div>
                                          {order.due_amount != 0.00 && (
                                            <div className='text-warning'><small>Due Amount: {useNumberFormat(order.due_amount)}</small></div>
                                          )}
                                          <div className='text-info'><small>Paid Amount: {useNumberFormat(order.paid_amount)}</small></div>
                                        </div>
                                      </td>
                                      <td>{order.sales_manager}</td>
                                      <td>
                                        <div>
                                          <div className='text-primary'><small>Created: {order.created_at}</small></div>
                                          <div className='text-info'><small>Updated: {order.updated_at}</small></div>
                                        </div>
                                      </td>
                                      <td>
                                        <ActionButton
                                          url='orders'
                                          id={order.id}
                                          webView
                                        />
                                      </td>
                                    </tr>
                                  )) : (
                                     <NoDataFound title='Ticket'/>
                                   )}
                                  </tbody>
                                </table>
                              </>
                            )}
                          </>
                          )}
                      </div>
                    </div>
                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getOrders}
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

export default Order

import {useEffect, useState} from 'react'
import {
  CardHeader,
  DefaultLayout,
  Images,
  Loader,
}                            from "../../components";
import {useParams}           from "react-router-dom";
import axiosClient           from "../../axios-client.js";
import product               from "../services/products/Product.jsx";
import index                 from "../../../public/assets/plugins/popper/popper-utils.js";
import useNumberFormat       from "../../hooks/useNumberFormat.js";

const OrderDetails = () => {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState([]);
  const {id} = useParams()

  const getorder = async () => {
    await axiosClient.get(`orders/${id}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setOrder(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    getorder()
  }, [id])


  return (
    <DefaultLayout title={`${order?.order_number} Ticket Details`}>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Ticket List' isForm link='/orders'/>
                <div className="card-body">
                  <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                      <div className="col-sm-12 col-md-6"/>
                      <div className="col-sm-12 col-md-6"/>
                    </div>
                    {loading && <Loader/>}
                    {!loading && (
                      <div className="row">
                        <div className='col-sm-6'>
                          <div className='card'>
                            <div className='card-header'>
                              <h5 className='card-title'>Visitor Details</h5>
                            </div>
                            <div className='card-body table-responsive'>
                              <table className='table table-striped table-hover'>
                                <tbody>
                                <tr>
                                  <th>Name</th>
                                  <td>{order?.visitor?.name}</td>
                                </tr>
                                <tr>
                                  <th>Phone</th>
                                  <td>{order?.visitor?.phone}</td>
                                </tr>
                                <tr>
                                  <th>Email</th>
                                  <td>{order?.visitor?.email}</td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-6'>
                          <div className='card'>
                            <div className='card-header'>
                              <h5 className='card-title'>Sales Manager Details</h5>
                            </div>
                            <div className='card-body table-responsive'>
                              <table className='table table-striped table-hover'>
                                <tbody>
                                <tr>
                                  <th>Name</th>
                                  <td>{order?.sales_manager?.name}</td>
                                </tr>
                                <tr>
                                  <th>Phone</th>
                                  <td>{order?.sales_manager?.phone}</td>
                                </tr>
                                <tr>
                                  <th>Email</th>
                                  <td>{order?.sales_manager?.email}</td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-12 mt-4'>
                          <div className='card'>
                            <div className='card-header'>
                              <h5 className='card-title'>Order Summary</h5>
                            </div>
                            <div className='card-body table-responsive'>
                              <table className='table table-striped table-bordered table-hover'>
                                <tbody>
                                <tr>
                                  <th>Order Number</th>
                                  <td><span className='text-primary'>{order?.order_number}</span></td>
                                  <th>Total Items</th>
                                  <td>{order?.quantity}</td>
                                </tr>
                                <tr>
                                  <th>Order Status</th>
                                  <td>{order?.order_status_string}</td>
                                  <th>Payment Status</th>
                                  <td>{order?.payment_status}</td>
                                </tr>
                                <tr>
                                  <th>Payment Method</th>
                                  <td>{order?.payment_method?.name}</td>
                                  <th>Order Placed</th>
                                  <td>{order?.created_at}</td>
                                </tr>
                                <tr>
                                  <th>Sub Total</th>
                                  <td>{useNumberFormat(order?.sub_total)}</td>
                                  <th>Discount</th>
                                  <td>{useNumberFormat(order?.discount)}</td>
                                </tr>
                                <tr>
                                  <th>Total</th>
                                  <td><span className='text-primary'>{useNumberFormat(order?.total)}</span></td>
                                </tr>
                                <tr>
                                  <th>Paid Amount</th>
                                  <td><span className='text-success'>{useNumberFormat(order?.paid_amount)}</span></td>
                                  <th>Due Amount</th>
                                  <td><span className='text-danger'>{useNumberFormat(order?.due_amount)}</span></td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-12 mt-4 mb-5'>
                          <div className='card'>
                            <div className='card-header'>
                              <h5 className='card-title'>Order Items Details</h5>
                            </div>
                            <div className='card-body table-responsive'>
                              <table className='table table-striped table-hover table-sm'>
                                <thead>
                                <tr>
                                  <th>SL</th>
                                  <th>Name</th>
                                  <th>Info</th>
                                  <th>Quantity</th>
                                  <th>Photo</th>
                                  <th>Amount</th>
                                  <th>Sub Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.order_details?.map((product, index) => (
                                  <tr key={index}>
                                    <td>{++index}</td>
                                    <td>
                                      <div>Name: <span>{product.name}</span></div>
                                      <div className='text-primary'>SKU: <span>{product.sku}</span></div>
                                      <div>Supplier: <span>{product.supplier}</span></div>
                                    </td>
                                    <td>
                                      <div>Brand: <span>{product.brand}</span></div>
                                      <div className='text-primary'>Category: <span>{product.category}</span></div>
                                      <div>Sub Category: <span>{product.sub_category}</span></div>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>
                                      <Images src={product.photo} alt={product.name}/>
                                    </td>
                                    <td>
                                      <div>Original Price: <span>{product.price}</span></div>
                                      <div
                                        className='text-primary'>Discount: <span>-{useNumberFormat(product?.selling_price?.discount)}</span>
                                      </div>
                                      <div>Sale Price: <span>{useNumberFormat(product?.selling_price?.price)}</span>
                                      </div>
                                    </td>
                                    <td>{useNumberFormat(product?.selling_price?.price * product.quantity)}</td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-12 mt-4 mb-5'>
                          <div className='card'>
                            <div className='card-header'>
                              <h5 className='card-title'>Treansactions</h5>
                            </div>
                            <div className='card-body table-responsive'>
                              <table className='table table-striped table-hover table-sm'>
                                <thead>
                                <tr>
                                  <th>SL</th>
                                  <th>Trx ID</th>
                                  <th>Amount</th>
                                  <th>Visitor</th>
                                  <th>Payment Method</th>
                                  <th>Status</th>
                                  <th>Treansaction By</th>
                                  <th>Created At</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.transactions?.map((transaction, index) => (
                                  <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{transaction.trx_id}</td>
                                    <td>{useNumberFormat(transaction.amount)}</td>
                                    <td>
                                      {transaction.visitor_name && (
                                        <div>Name: <span>{transaction.visitor_name}</span></div>
                                      )}
                                      {transaction.visitor_phone && (
                                        <div>Phone: <span>{transaction.visitor_phone}</span></div>
                                      )}
                                    </td>
                                    <td>{transaction.payment_method_name}</td>
                                    <td>
                                      <div>Status: <span>{transaction.status}</span></div>
                                      <div className='text-primary'>Transaction Type: <span>{transaction.transaction_type}</span></div>
                                    </td>
                                    <td><span>{transaction.transaction_by}</span></td>
                                    <td>{transaction.created_at}</td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
export default OrderDetails

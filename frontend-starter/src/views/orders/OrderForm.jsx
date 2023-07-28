import {
  AddVisitorModal,
  CardHeader,
  DefaultLayout,
  Loader,
  Search,
  ShowOrderConfirmationModal
}                                     from "../../components";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import toastAlert from "../../data/toastAlert";
import index from "../../../public/assets/plugins/popper/popper-utils.js";

const OrderForm = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)

  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalShowOrderConfirmation, setModalShowOrderConfirmation] = useState(false);

  const [modalPhoto, setModalPhoto] = useState('');
  const [product, setProduct] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [carts, setCarts] = useState({});
  const [visitorInput, setVisitorInput] = useState('')
  const [orderSummary, setOrderSummary] = useState({
    items: 0,
    amount: 0,
    discount: 0,
    payable: 0,
    visitor: '',
    visitor_id: 0,
    paid_amount: 0,
    due_amount: 0,
    payment_method_id: 1,
    txt_id: '',
  });
  const [order, setOrder] = useState({})
  const [visitors, setVisitors] = useState([])
  const [changeInput, setChangeInput] = useState({quantity: 1})
  const navigate = useNavigate()


  const getVisitors = async () => {
    setLoading(true)
    await axiosClient.get(`visitors?&search=${visitorInput}`).then(res => {
      setLoading(false)
      setVisitors(res.data.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  const getPaymentMethods = async () => {
    setLoading(true)
    await axiosClient.get('payment-methods').then(res => {
      setLoading(false)
      setPaymentMethods(res.data.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  const handleVisitorSearch = (e) => {
    setVisitorInput(e.target.value)
  }

  const getCategory = async () => {
    setLoading(true)
    await axiosClient.get(`/orders/${id}`).then(res => {
      setLoading(false)
      setInput(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  const getProducts = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`products?&page=${pageNumber}${searchQuery}`).then(res => {
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
    getVisitors()
    getPaymentMethods()
  }, [])

  const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))

  const handleCart = (id) => {
    products.map((product, index) => {
      if (product.id == id) {
        if (carts[id] == undefined) {
          setCarts(prevState => ({...prevState, [id]: product}))
          setCarts(prevState => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              quantity: 1
            }
          }))
        } else {
          if (carts[id].stock > carts[id].quantity) {
            setCarts(prevState => ({
              ...prevState,
              [id]: {
                ...prevState[id],
                quantity: carts[id].quantity + 1
              }
            }))
          }
        }
      }
    })
  }

  useEffect(() => {
    calculateOrderSummary()
  }, [carts])

  const removeCart = (key) => {
    setCarts(current => {
      let copy = {...current}
      delete copy[key]
      return copy
    })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axiosClient.post('/orders', {carts, 'order_summary': orderSummary}).then(res => {
      setModalShowOrderConfirmation(false)
      setLoading(false)
      toastAlert(res.data.message)
      navigate(`/orders/${res.data.order_id}/details`)
    }).catch(err => {
      setLoading(false)
      toastAlert('Check Ticket Availabity')
      console.log(err)
    })
  }

  const selectVisitor = (visitor) => {
    setOrder(prevState => ({...prevState, visitor_id: visitor.id}))
    setOrderSummary(prevState => ({...prevState, visitor: visitor.name + ' - ' + visitor.phone}))
    setOrderSummary(prevState => ({...prevState, visitor_id: visitor.id}))
  }

  const handleIncrement = (id) => {
    if (carts[id].stock > carts[id].quantity) {
      setCarts(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity + 1
        }
      }))
    }
  }

  const handleDecrement = (id) => {
    if (carts[id].quantity > 1) {
      setCarts(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity - 1
        }
      }))
    }
  }

  const handleInputChanges = (e) => {
    if (e.target.value <= 1) {
      setChangeInput(1)
    }
    setChangeInput(e.target.value)
  }

  const calculateOrderSummary = () => {
    let items = 0
    let amount = 0
    let discount = 0
    let payable = 0
    let paid_amount = 0
    Object.keys(carts).map((key) => {
      amount += carts[key].original_price * carts[key].quantity
      discount += carts[key].selling_price.discount * carts[key].quantity
      payable += carts[key].selling_price.price * carts[key].quantity
      items += carts[key].quantity
    })

    setOrderSummary(prevState => ({...prevState,
      items,
      amount,
      discount,
      payable,
      paid_amount: payable
    }))
  }

  const handleOrderSummaryInput = (e) => {
    e.preventDefault()
    if (e.target.name == 'paid_amount' && orderSummary.payable >= e.target.value) {
      setOrderSummary(prevState => ({...prevState,
        paid_amount: e.target.value,
        due_amount: orderSummary.payable - e.target.value,
      }))
    } else if (e.target.name == 'payment_method_id') {
      setOrderSummary(prevState => ({...prevState,
        payment_method_id: e.target.value,
      }))
    }
  }

  const handleQuantityInput = (e, id) => {
    e.preventDefault()
    if (carts[id].stock > carts[id].quantity) {
      setCarts(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity + e.target.value
        }
      }))
    }
  }


    return (
        <DefaultLayout title={'Sell Ticket'}>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <CardHeader isForm title={'Sell Ticket'} link='/orders' />
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          {/* general form elements */}
                          <div className="card card-primary">
                            <div className='row'>
                              <div className='col-sm-4'>
                                <div className='card'>
                                  <div className='card-header'>
                                    <h5>Product List</h5>
                                  </div>
                                  <div className='card-body p-1 mb-3 mt-2'>
                                    <div className='product-search'>
                                      <div className='input-group mb-3'>
                                        <input type="search" onKeyUp={getProducts} onKeyDown={getProducts} className='form-control' name="search" value={input.search} onChange={handleInput} placeholder='Search...' />
                                        <div className="input-group-append">
                                          <button onClick={getProducts} className="input-group-text bg-primary"><i className="fas fa-search"></i></button>
                                        </div>
                                      </div>
                                    </div>
                                    {products.map((product, index) => (
                                      <div key={index} className="d-flex align-items-center p-2 position-relative order-product-container">
                                        <div style={{
                                          position: 'absolute',
                                          right: 7,
                                          top: 5,
                                          display: "flex",
                                          justifyContent: "center",
                                          gap: 5
                                        }}>
                                          <button className='btn btn-sm btn-info'><i className='fa fa-eye' /></button>
                                          <button onClick={() => handleCart(product.id)} className='btn btn-sm btn-success'><i className='fa fa-plus' /></button>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <img src={product.primary_photo} alt={product.name} style={{
                                            width: 75,
                                            cursor: "pointer",
                                            borderRadius: 5
                                          }} onClick={() => handleCart(product.id)} />
                                        </div>
                                        <div className="flex-grow-1 ms-3 ml-2">
                                          <div className='text-primary'><strong>{product.name}</strong></div>
                                          <div><small>Original Price: <span>{product.price}</span></small></div>
                                          <div><small>Price: <span>{product.selling_price.currency}{product.selling_price.price} | Discount: {product.selling_price.discount}</span></small></div>
                                          <div><small>SKU: <span>{product.sku}</span> | Stock: <span>{product.stock}</span></small></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className='card'>
                                  <div className='card-header'>
                                    <h5>Cart</h5>
                                  </div>
                                  <div className='card-body p-1'>
                                    <div className='order-summary table-responsive-sm mt-2'>
                                      {orderSummary.visitor && (
                                        <p className='pb-2 ms-1'><strong>Customer:</strong><span className='text-primary'> {orderSummary.visitor}</span></p>
                                      )}
                                      <table className='table table-sm table-bordered table-striped table-hover'>
                                        <tbody>
                                        <tr>
                                          <th>Total Items</th>
                                          <td className=''>{orderSummary.items}</td>
                                        </tr>
                                        <tr>
                                          <th>Amount</th>
                                          <td className=''>{'GHS'+ new Intl.NumberFormat('us').format(orderSummary.amount)}</td>
                                        </tr>
                                        <tr>
                                          <th>Discount</th>
                                          <td className='text-danger'>{'GHS'+orderSummary.discount > 0 ? new Intl.NumberFormat('us').format(orderSummary.discount): '-GHS'+ new Intl.NumberFormat('us').format(orderSummary.discount)}</td>
                                        </tr>
                                        <tr>
                                          <th>Net Payable Amount</th>
                                          <td className=''>{'GHS'+ new Intl.NumberFormat('us').format(orderSummary.payable)}</td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    {Object.keys(carts).length > 0 ? Object.keys(carts).map((key, index) => (
                                      <div key={index} className="d-flex align-items-center p-2 position-relative order-product-container">
                                        <div style={{
                                          position: 'absolute',
                                          right: 0,
                                          top: 5,
                                          display: "flex",
                                          justifyContent: "center",
                                          gap: 5
                                        }}>
                                          <button className='btn btn-sm btn-info'><i className='fa fa-eye' /></button>
                                          <button className='btn btn-sm btn-danger' onClick={() => removeCart(key)}><i className='fa fa-times' /></button>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <img src={carts[key].primary_photo} alt={product.name} style={{
                                            width: 75,
                                            borderRadius: 5
                                          }} />
                                        </div>
                                        <div className="flex-grow-1 ms-3 ml-2">
                                          <div className='text-primary'><strong>{carts[key].name}</strong></div>
                                          <div><small>Original Price: <span>{carts[key].price}</span></small></div>
                                          <div><small>Price: <span>{carts[key].selling_price.currency}{carts[key].selling_price.price} | Discount: {carts[key].selling_price.discount}</span></small></div>
                                          <div><small>SKU: <span>{carts[key].sku}</span> | <span className={carts[key].stock <= carts[key].quantity && 'text-danger'}>Stock: <span>{carts[key].stock}</span></span></small></div>
                                          <hr />
                                          <div className='d-flex justify-content-center align-items-center'>
                                            <span>Quantity:</span>
                                            <div style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 10,
                                            }}>
                                              <button className='quantity-button'
                                                      disabled={carts[key].quantity <= 1}
                                                      onClick={() => handleDecrement(carts[key].id)}>-</button>
                                              <input type="text"
                                                     value={carts[key].quantity}
                                                     className='quantity-input'
                                              />
                                              <button className='quantity-button'
                                                      disabled={carts[key].stock <= carts[key].quantity}
                                                      onClick={() => handleIncrement(carts[key].id)}>+</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )) : (
                                      <p className='text-warning text-center text-lg'>No Item In Cart...</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className='card'>
                                  <div className='card-header'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                      <h5>Visitor List</h5>
                                      <button className='btn btn-sm btn-primary' onClick={() => setModalShow(true)}><i className='fa fa-plus' /></button>
                                    </div>
                                  </div>
                                  <div className='card-body p-1'>
                                    <div className='product-search mb-4'>
                                      <div className='input-group mb-3'>
                                        <input type="search" onKeyUp={getVisitors} onKeyDown={getVisitors}
                                               className='form-control form-control-border border-width-2'
                                               name="search" value={visitorInput}
                                               onChange={handleVisitorSearch}
                                               placeholder='Search...' />
                                      </div>
                                      <ul className='customer-list pt-3'>
                                        {visitors.map((visitor, index) => (
                                          <li className={orderSummary.visitor_id == visitor.id ? 'text-primary order-product-container px-2' : 'order-product-container px-2'} key={index} onClick={() => selectVisitor(visitor)}>{visitor.name} - {visitor.phone}</li>
                                        ))}
                                      </ul>
                                      <div className='d-grid mt-4 ml-5'>
                                        <button
                                          disabled={orderSummary.items == 0}
                                          onClick={() => setModalShowOrderConfirmation(true)}
                                          className='btn btn-primary'>Place Order</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AddVisitorModal setModalShow={() => setModalShow(false)} show={modalShow} onHide={() => setModalShow(false)} />

                      <ShowOrderConfirmationModal
                        carts={carts}
                        orderSummary={orderSummary}
                        show={modalShowOrderConfirmation}
                        onHide={() => setModalShowOrderConfirmation(false)}
                        handlePlaceOrder={handlePlaceOrder}
                        handleOrderSummaryInput={handleOrderSummaryInput}
                        paymentMethods={paymentMethods}
                        loading={loading}
                      />
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        </DefaultLayout>
    )
}

export default OrderForm

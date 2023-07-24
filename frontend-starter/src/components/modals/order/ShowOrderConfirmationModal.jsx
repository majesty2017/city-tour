import {Button, DefaultModal}       from "../../";
import React, {useEffect, useState} from "react";
import moment                       from "moment";

const ShowOrderConfirmationModal = ({handlePlaceOrder, handleOrderSummaryInput, ...props}) => {
  const [date, setDate] = useState(null)

  useEffect(() => {
    const date = moment().format("DD MMMM, YYYY");
    setDate(date)
  }, []);


  return (
    <DefaultModal size='lg' show={props.show} onHide={props.onHide} label='Ticket Details Confirmation'>
      <div className='order-details-confirmation'>
        <div className='d-flex justify-content-between'>
          <img src="/assets/dist/img/AdminLTELogo.png"
               alt="Logo"
               className="brand-image img-thumbnail elevation-3"
               style={{opacity: ".8", width: 64}}
          />
          <h4 className='text-uppercase'>Ticket DETAILS</h4>
        </div>

        <div className='d-flex justify-content-between mt-4 align-items-center'>
          <div>
            <h3 className='company'><strong>Wli Waterfalls </strong></h3>
            <address>Wli waterfalls, wli, 0200390990</address>
          </div>
          {props.orderSummary.visitor && (
            <div>
              <div><strong>{date}</strong></div>
              <h5>VISITOR DETAILS</h5>
              <div>Name: <span>{props.orderSummary.visitor.split('-')[0]}</span></div>
              <div>Phone: <span>{props.orderSummary.visitor.split('-')[1]}</span></div>
            </div>
          )}
        </div>

        <div className='d-flex justify-content-center align-items-center table-responsive'>
          <table className='table table-striped table-sm table-bordered table-hover mt-4'>
            <thead>
            <tr>
              <th>SL</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Sub Total</th>
            </tr>
            </thead>

            <tbody>
            {Object.keys(props.carts).map((key, index) => (
              <tr>
                <td>{++index}</td>
                <td>{props.carts[key].name}</td>
                <td>{props.carts[key].quantity}</td>
                <td>{props.carts[key].price}</td>
                <td>GHS{new Intl.NumberFormat('us').format(props.carts[key].original_price * props.carts[key].quantity)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-end table-responsive'>
          <table className='table-borderless table-sm'>
            <tbody>
            <tr>
              <th><span>Sub Total:</span></th>
              <td><span>GHS{new Intl.NumberFormat('us').format(props.orderSummary.amount)}</span></td>
            </tr>
            <tr>
              <th><span>Discount:</span></th>
              <td><span className='text-danger'>-GHS{new Intl.NumberFormat('us').format(props.orderSummary.discount)}</span></td>
            </tr>
            <tr>
              <th><span>Total:</span></th>
              <td><span>GHS{new Intl.NumberFormat('us').format(props.orderSummary.payable)}</span></td>
            </tr>
            <tr>
              <th className='align-middle'><span>Paid Amount:</span></th>
              <td><span>
                <div className='input-group mb-3'>
                  <input type="number"
                         className='form-control form-control-border border-width-2'
                         name="paid_amount"
                         value={props.orderSummary.paid_amount}
                         onChange={handleOrderSummaryInput}
                         style={{width: 100}}
                         placeholder='Search...' />
                  <div className="input-group-append">
                    <span className="input-group-text" style={{background: "inherit", border: "none"}}>GHS</span>
                  </div>
                </div>
              </span></td>
            </tr>
            <tr>
              <th><span>Due Amount:</span></th>
              <td><span>GHS{new Intl.NumberFormat('us').format(props.orderSummary.due_amount)}</span></td>
            </tr>
            <tr>
              <th className='align-middle'><span>Payment Method:</span></th>
              <td><span>
                <select
                  className="custom-select form-control-border border-width-2"
                  id="payment_method_id"
                  name="payment_method_id"
                  defaultValue={props.orderSummary.payment_method_id}
                  value={props.orderSummary.payment_method_id}
                  placeholder='Select option'
                  onChange={handleOrderSummaryInput}
                >
                  <option>Select option</option>
                  {props.paymentMethods.map((paymentMethod, index) => (
                    <option key={index} value={paymentMethod.id}>{paymentMethod.name}</option>
                  ))}
                </select>
              </span></td>
            </tr>
            <tr className='d-none'>
              <th className='align-middle'><span>Transaction ID:</span></th>
              <td><span>
                <div className='input-group mb-3'>
                  <input type="number"
                         className='form-control form-control-border border-width-2'
                         name="paid_amount"
                         value={props.orderSummary.txt_id}
                         onChange={handleOrderSummaryInput}
                         style={{width: 100}}
                         placeholder='Transaction ID' />
                  <div className="input-group-append">
                    <span className="input-group-text" style={{background: "inherit", border: "none"}}>GHS</span>
                  </div>
                </div>
              </span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-end px-4 mt-4'>
          <Button onClick={handlePlaceOrder} loading={props.loading} className='mr-3' label='Confirm'/>
          <button className='btn btn-danger' onClick={props.onHide}>Close</button>
        </div>
      </div>
    </DefaultModal>
  )
}

export default ShowOrderConfirmationModal

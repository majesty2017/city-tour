import {
  CardHeader,
  DefaultLayout,
} from "../../components";
import axiosClient           from "../../axios-client.js";
import {useEffect, useState} from "react";

const Report = () => {
  const [report, setReport] = useState([]);

  const getReport = async () => {
   await axiosClient.get('/get-report').then(res => {
     setReport(res.data)
   })
  }

  useEffect(() => {
    getReport()
  }, [])


  return (
    <DefaultLayout title='Reports'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Report' />
                <div className="card-body">
                  <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className='card'>
                      <div className='card-header'>
                        <h5>Sales</h5>
                      </div>
                      <div className='card-body'>
                        <div className="row">
                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-cart-shopping fa-2x text-primary"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Sales</h6>
                                    <h4>123,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-cart-plus fa-2x text-primary"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Purchase</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-rotate-left fa-2x text-primary"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Sales Return</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-rotate-left fa-flip-horizontal fa-2x text-primary"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Purchase Return</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3 mt-4'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-hand-holding-dollar text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Today's Sale</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3 mt-4'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-person-walking-arrow-loop-left text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Today's Purchase</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3 mt-4'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-arrow-right-arrow-left text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Today Sales Return</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3 mt-4'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-right-left text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Purchase Return Today</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='card'>
                      <div className='card-header'>
                        <h5>Stock</h5>
                      </div>
                      <div className='card-body'>
                        <div className="row">
                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-box-open text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Products</h6>
                                    <h4>123,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-box text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Stock</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-battery-quarter text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Low Stock</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-dollar-sign text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Stock Value</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='card'>
                      <div className='card-header'>
                        <h5>Expense</h5>
                      </div>
                      <div className='card-body'>
                        <div className="row">
                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-hand-holding-dollar text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Expense</h6>
                                    <h4>123,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-sack-dollar text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Expense Today</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='card'>
                      <div className='card-header'>
                        <h5>Withdrawal</h5>
                      </div>
                      <div className='card-body'>
                        <div className="row">
                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-arrow-right-from-bracket text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Withdrawal</h6>
                                    <h4>123,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-money-bill-transfer text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Withdrawal Today</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='card'>
                      <div className='card-header'>
                        <h5>Profit</h5>
                      </div>
                      <div className='card-body'>
                        <div className="row">
                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-2">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-chart-line text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-2 text-sm">
                                    <h6>Total Profit</h6>
                                    <h4>123,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div className='card report-card'>
                              <div className='card-body'>
                                <div className="d-flex justify-content-center align-items-center mx-3">
                                  <div className="flex-shrink-0">
                                    <i className="fa-solid fa-solid fa-chart-bar text-primary fa-2x"></i>
                                  </div>
                                  <div className="flex-grow-1 mx-3">
                                    <h6>Total Profit Today</h6>
                                    <h4>23,000</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default Report

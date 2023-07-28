import {DefaultLayout, Preloader} from "../components";
import {useEffect, useState}      from "react";
import axiosClient                from "../axios-client.js";
import {Link}                     from "react-router-dom";

const Dashboard = () => {
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
    <DefaultLayout title={'Dashboard'}>
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{report?.total_sale}</h3>
                  <p>Total Sales</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"/>
                </div>
                <Link to="/orders" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{report?.total_sale_today}</h3>
                  <p>Total Sales Today</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"/>
                </div>
                <Link to="/orders" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{report?.total_product}</h3>
                  <p>Total Product</p>
                </div>
                <div className="icon">
                  <i className="fa-solid fa-box-open"/>
                </div>
                <Link to="/products" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{report?.total_stock}</h3>
                  <p>Total In Stock</p>
                </div>
                <div className="icon">
                  <i className="fa-solid fa-box"/>
                </div>
                <Link to="/products" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"/>
                </Link>
              </div>
            </div>
            {/* ./col */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </DefaultLayout>
  )
}

export default Dashboard

import React, {useEffect, useState} from 'react'
import {
  CardHeader,
  DefaultLayout,
  Loader,
}                                   from "../../components";
import {useParams} from "react-router-dom";
import axiosClient       from "../../axios-client.js";

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
    <DefaultLayout title='Ticket Details'>
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
                    <div className="row">

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
export default OrderDetails

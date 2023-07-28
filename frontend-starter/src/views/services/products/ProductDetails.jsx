import {
  Card,
  CardHeader,
  DefaultLayout,
}                            from "../../../components";
import {Link, useParams}     from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient           from "../../../axios-client.js";
import useNumberFormat       from "../../../hooks/useNumberFormat.js";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const {id} = useParams()

  const getProduct = async () => {
    setLoading(true)
    await axiosClient.get(`products/${id}`).then(res => {
      setLoading(false)
      setProduct(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
getProduct()
  }, []);


  return (
    <DefaultLayout title='Product Details'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Product Details' isForm link='/products'/>
                <div className="card-body">
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Card title='Basic Information'>
                        <table className='table table-striped table-hover table-sm'>
                          <tbody>
                          <tr>
                            <th>Name</th>
                            <td>{product?.name}</td>
                          </tr>
                          <tr>
                            <th>Slug</th>
                            <td>{product?.slug}</td>
                          </tr>
                          <tr>
                            <th>SKU</th>
                            <td>{product?.sku}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>{product?.status}</td>
                          </tr>
                          <tr>
                            <th>Category</th>
                            <td><Link to='/categories'>{product?.category}</Link></td>
                          </tr>
                          <tr>
                            <th>Sub Category</th>
                            <td><Link to='/sub-categories'>{product?.sub_category}</Link></td>
                          </tr>
                          <tr>
                            <th>Brand</th>
                            <td><Link to='/brands'>{product?.brand}</Link></td>
                          </tr>
                          <tr>
                            <th>Supplier</th>
                            <td><Link to='/suppliers'>{product?.supplier}</Link></td>
                          </tr>
                          <tr>
                            <th>Created By</th>
                            <td>{product?.created_by}</td>
                          </tr>
                          <tr>
                            <th>Updated By</th>
                            <td>{product?.updated_by}</td>
                          </tr>
                          <tr>
                            <th>Created At</th>
                            <td>{product?.created_at}</td>
                          </tr>
                          <tr>
                            <th>Updated At</th>
                            <td>{product?.updated_at}</td>
                          </tr>
                          </tbody>
                        </table>
                      </Card>
                    </div>
                    <div className='col-sm-6'>
                      <Card title='Price & Stock'>
                        <table className='table table-striped table-hover table-sm'>
                          <tbody>
                          <tr>
                            <th>Cost</th>
                            <td>{product?.cost}</td>
                          </tr>
                          <tr>
                            <th>Original Sales Price</th>
                            <td>{useNumberFormat(product?.original_price)}</td>
                          </tr>
                          <tr>
                            <th>Sales Price</th>
                            <td>{product?.selling_price?.currency}{product?.selling_price?.price}</td>
                          </tr>
                          <tr>
                            <th>Discount</th>
                            <td>{product?.selling_price?.currency}{product?.selling_price?.discount}</td>
                          </tr>
                          <tr>
                            <th>Discount Percent</th>
                            <td>{product?.discount_percent}</td>
                          </tr>
                          <tr>
                            <th>Discount Fixed</th>
                            <td>{product?.discount_fixed}</td>
                          </tr>
                          <tr>
                            <th>Discount Start</th>
                            <td>{product?.discount_start}</td>
                          </tr>
                          <tr>
                            <th>Discount End</th>
                            <td>{product?.discount_end}</td>
                          </tr>
                          <tr>
                            <th>Discount Remaining Days</th>
                            <td>{product?.discount_remaining_days}days</td>
                          </tr>
                          <tr>
                            <th>Stock</th>
                            <td>{product?.stock}</td>
                          </tr>
                          <tr>
                            <th>Profit</th>
                            <td>{product?.profit}</td>
                          </tr>
                          <tr>
                            <th>Profit (%)</th>
                            <td>{product?.profit_percent}%</td>
                          </tr>
                          </tbody>
                        </table>
                      </Card>
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
export default ProductDetails

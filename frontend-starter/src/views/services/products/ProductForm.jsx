import {CardHeader, DefaultLayout, Loader, Search} from "../../../components";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import toastAlert from "../../../data/toastAlert";
import useFetch from "../../../hooks/useFetch.js";

const ProductForm = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({status: 1})

  const [attributeInput, setAttributeInput] = useState({})
  const [specificationInput, setSpecificationInput] = useState({status: 1})

  const [specificationField, setSpecificationField] = useState([])
  const [specificationFieldId, setSpecificationFieldId] = useState(1)

  const [attributeField, setAttributeField] = useState([])
  const [attributeFieldId, setAttributeFieldId] = useState(1)

  const [errors, setErrors] = useState([])
  const [product, setProduct] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(false)


  const {data: categories} = useFetch('/categories/list')
  const {data: brands} = useFetch('/brands/list')
  const {data: countries} = useFetch('/countries/list')
  const {data: attributes} = useFetch('/attributes/list')
  const {data: suppliers} = useFetch('/suppliers/list')

  const {id} = useParams()

  const getProduct = async () => {
    setLoading(true)
    await axiosClient.get(`/products/${id}`).then(res => {
      setLoading(false)
      setInput(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  const getSubCategories = async (category_id) => {
    await axiosClient.get(`/sub_categories/list/${category_id}`).then(res => {
      setSubCategories(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getProduct()
  }, [])

  const handleInput = (e) => {
    if (e.target.name === 'name') {
      let slug = e.target.value
      slug = slug.toLowerCase()
      slug = slug.replaceAll(' ', '-')
      setInput(prevState => ({
        ...prevState, slug: slug
      }))
    } else if (e.target.name == 'category_id') {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(e.target.value)
      }
    }
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      setInput(prevState => ({
        ...prevState, photo: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const store = async () => {
      setLoading(true)
      await axiosClient.post('/products', input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/products')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }
    const update = async () => {
      setLoading(true)
      await axiosClient.put(`/products/${id}`, input).then(res => {
        setLoading(false)
        toastAlert(res.data.message)
        navigate('/products')
      }).catch(err => {
        setLoading(false)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
    }

    if (id) {
      update()
    } else {
      store()
    }
  }

  const handleSpecificationFieldRemove = (id) => {
    setSpecificationField(oldValues => {
      return oldValues.filter(specificationField => specificationField !== id)
    })
    setSpecificationInput(current => {
      const copy = {...current};
      delete copy[id];
      return copy;
    })
    setSpecificationFieldId(specificationFieldId - 1)
  }

  const handleSpecificationFields = (id) => {
    setSpecificationFieldId(specificationFieldId + 1)
    setSpecificationField(prevState => [...prevState, specificationFieldId])
  }

  const handleAttributeFieldsRemove = (id) => {
    setAttributeField(oldValues => {
      return oldValues.filter(attributeField => attributeField !== id)
    })
    setAttributeInput(current => {
      const copy = {...current};
      delete copy[id];
      return copy;
    })
    setAttributeFieldId(attributeFieldId-1)
  }

  const handleAttributeFields = (id) => {
    if (attributes.length >= attributeFieldId){
      setAttributeFieldId(attributeFieldId + 1)
      setAttributeField(prevState => [...prevState, attributeFieldId])
    }
  }

  const handleSpecificationInput = (e, id) => {
    setSpecificationInput(prevState => ({
      ...prevState,
      [id]:{
        ...prevState[id], [e.target.name]: e.target.value
      }
    }))
  }

  const handleAttributeInput = (e, id) => {
    setAttributeInput(prevState => ({
      ...prevState,
      [id]:{
        ...prevState[id], [e.target.name]: e.target.value
      }
    }))
    setInput(prevState => ({...prevState, attributes: attributeInput}))
  }

  useEffect(()=>{
    setInput(prevState => ({...prevState, attributes: attributeInput}))
  }, [attributeInput])

  useEffect(()=>{
    setInput(prevState => ({...prevState, specifications: specificationInput}))
  }, [specificationInput])

  return (
    <DefaultLayout title={id ? `Edit Product` : 'Add Product'}>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader isForm title={id ? `Edit Product` : 'Add Product'} link='/products'/>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      {/* general form elements */}
                      <div className="card card-primary">
                        <form onSubmit={handleSubmit}>
                          <div className="card-body">
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <input
                                    type="text"
                                    className={errors.name !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="name"
                                    name="name"
                                    value={input.name}
                                    onChange={handleInput}
                                    placeholder="Enter name"
                                  />
                                  <p className='text-danger'>
                                    <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="slug">Slug</label>
                                  <input
                                    type="text"
                                    className={errors.slug !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="slug"
                                    name="slug"
                                    value={input.slug}
                                    onChange={handleInput}
                                    placeholder="Enter slug"
                                  />
                                  <p className='text-danger'>
                                    <small>{errors.slug !== undefined ? errors.slug[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="category_id">Select Category</label>
                                  <select
                                    className={errors.category_id !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="category_id"
                                    name="category_id"
                                    defaultValue={input.category_id}
                                    onChange={handleInput}
                                  >
                                    <option value=''>Select option</option>
                                    {categories.map(category => (
                                      <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                  </select>
                                  <p className='text-danger'>
                                    <small>{errors.category_id !== undefined ? errors.category_id[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="sub_category_id">Select Sub Category</label>
                                  <select
                                    className={errors.sub_category_id !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="sub_category_id"
                                    name="sub_category_id"
                                    defaultValue={input.sub_category_id}
                                    onChange={handleInput}
                                    disabled={input.category_id == undefined}
                                  >
                                    <option value=''>Select option</option>
                                    {subCategories.map(category => (
                                      <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                  </select>
                                  <p className='text-danger'>
                                    <small>{errors.sub_category_id !== undefined ? errors.sub_category_id[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="brand_id">Select Brand</label>
                                  <select
                                    className={errors.brand_id !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="brand_id"
                                    name="brand_id"
                                    defaultValue={input.brand_id}
                                    onChange={handleInput}
                                  >
                                    <option value=''>Select option</option>
                                    {brands.map(brand => (
                                      <option value={brand.id} key={brand.id}>{brand.name}</option>
                                    ))}
                                  </select>
                                  <p className='text-danger'>
                                    <small>{errors.brand_id !== undefined ? errors.brand_id[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="supplier_id">Select Supplier</label>
                                  <select
                                    className={errors.supplier_id !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                    id="supplier_id"
                                    name="supplier_id"
                                    defaultValue={input.supplier_id}
                                    onChange={handleInput}
                                  >
                                    <option value=''>Select option</option>
                                    {suppliers.map((supplier) => (
                                      <option value={supplier.id}
                                              key={supplier.id}>{supplier.name} - {supplier.phone}</option>
                                    ))}
                                  </select>
                                  <p className='text-danger'>
                                    <small>{errors.supplier_id !== undefined ? errors.supplier_id[0] : null}</small>
                                  </p>
                                </div>
                              </div>

                              <div className='col-sm-12 my-4'>
                                <div className='card'>
                                  <div className='card-header'>
                                    <h5>Select Product Attribute</h5>
                                  </div>
                                  <div className='card-body'>
                                    {attributeField.map((id, ind)=>(
                                      <div className='row my-2 align-items-baseline'>
                                        <div className='col-sm-5'>
                                          <div className="form-group">
                                            <label htmlFor="attribute_id">
                                              Select Attribute
                                            </label>
                                            <select
                                              className="custom-select form-control-border border-width-2"
                                              id="attribute_id"
                                              name="attribute_id"
                                              defaultValue={attributeInput[id] != undefined ? attributeInput[id].attribute_id : null}
                                              placeholder='Select option'
                                              onChange={(e)=>handleAttributeInput(e, id)}
                                            >
                                              <option>Select option</option>
                                              {attributes.map((value, index)=>(
                                                <option value={value.id}>{value.name}</option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                        <div className='col-sm-5'>
                                          <div className="form-group">
                                            <label htmlFor="value_id">
                                              Select Attribute Value
                                            </label>
                                            <select
                                              className="custom-select form-control-border border-width-2"
                                              id="value_id"
                                              name="value_id"
                                              defaultValue={attributeInput[id] != undefined ? attributeInput[id].value_id : null}
                                              placeholder='Select option'
                                              onChange={(e)=>handleAttributeInput(e, id)}
                                            >
                                              <option>Select option</option>
                                              {attributes.map((value, index)=>(
                                                <>
                                                  {attributeInput[id] != undefined && value.id == attributeInput[id].attribute_id ? value.value.map((atr_value, value_ind)=>(
                                                    <option value={atr_value.id}>{atr_value.name}</option>
                                                  )):null}
                                                </>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                        <div className='col-sm-2'>
                                          {attributeField.length -1 == ind && (
                                            <button type='button' className='btn btn-danger' onClick={()=>handleAttributeFieldsRemove(id)}>
                                              <i className='fa fa-minus' />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}

                                    <div className="row">
                                      <div className="col-md-12 text-center">
                                        <button type='button' className={'btn btn-success'} onClick={handleAttributeFields}>
                                          <i className="fa fa-plus"/>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-sm-12 my-4 d-none">
                                <div className="card">
                                  <div className="card-header">
                                    <h5>Product Specifications</h5>
                                  </div>
                                  <div className="card-body">
                                    {specificationField.map((id, ind)=>(
                                      <div key={ind} className="row my-2 align-items-baseline">
                                        <div className="col-md-5">
                                          <label className={'w-100 mt-4'}>
                                            <p>Specification Name</p>
                                            <input
                                              className={'form-control mt-2'}
                                              type={'text'}
                                              name={'name'}
                                              value={specificationInput[id] != undefined ? specificationInput[id].name : null}
                                              onChange={(e)=>handleSpecificationInput(e, id)}
                                              placeholder={'Enter Product Specification Name'}
                                            />
                                            <p className={'login-error-msg'}>
                                              <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                          </label>
                                        </div>
                                        <div className="col-md-5">
                                          <label className={'w-100 mt-4'}>
                                            <p>Specification Value</p>
                                            <input
                                              className='form-control mt-2'
                                              type={'text'}
                                              name={'value'}
                                              value={specificationInput[id] != undefined ? specificationInput[id].value : null}
                                              onChange={(e)=>handleSpecificationInput(e, id)}
                                              placeholder={'Enter Product Specification Name'}
                                            />
                                            <p className={'login-error-msg'}>
                                              <small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                                          </label>
                                        </div>
                                        <div className="col-md-2">
                                          {specificationField.length -1 == ind ?
                                            <button type='button' className={'btn btn-danger'} onClick={()=>handleSpecificationFieldRemove(id)}>
                                              <i className="fa fa-minus"/>
                                            </button> : null
                                          }

                                        </div>
                                      </div>
                                    ))}

                                    <div className="row">
                                      <div className="col-md-12 text-center">
                                        <button type='button' className={'btn btn-success'} onClick={handleSpecificationFields}>
                                          <i className="fa fa-plus"/>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-sm-12 my-4">
                                <div className="card">
                                  <div className="card-header">
                                    <h5>Product Price And Stock</h5>
                                  </div>
                                  <div className="card-body">
                                    <div className='row'>
                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="cost">Product Cost Price</label>
                                          <input
                                            type="number"
                                            className={errors.cost !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="cost"
                                            name="cost"
                                            value={input.cost}
                                            onChange={handleInput}
                                            placeholder="Enter cost price"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.cost !== undefined ? errors.cost[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="price">Product Selling Price</label>
                                          <input
                                            type="number"
                                            className={errors.price !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="price"
                                            name="price"
                                            value={input.price}
                                            onChange={handleInput}
                                            placeholder="Enter price"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.price !== undefined ? errors.price[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="discount_percent">Discount (%)</label>
                                          <input
                                            type="number"
                                            className={errors.discount_percent !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="discount_percent"
                                            name="discount_percent"
                                            value={input.discount_percent}
                                            onChange={handleInput}
                                            placeholder="Enter discount (%)"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.discount_percent !== undefined ? errors.discount_percent[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="discount_fixed">Discount Fixed Amount</label>
                                          <input
                                            type="number"
                                            className={errors.discount_fixed !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="discount_fixed"
                                            name="discount_fixed"
                                            value={input.discount_fixed}
                                            onChange={handleInput}
                                            placeholder="Enter discount fixed amount"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.discount_fixed !== undefined ? errors.discount_fixed[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="discount_start">Discount Start Date</label>
                                          <input
                                            type="datetime-local"
                                            className={errors.discount_start !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="discount_start"
                                            name="discount_start"
                                            value={input.discount_start}
                                            onChange={handleInput}
                                            placeholder="Enter discount start date"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.discount_start !== undefined ? errors.discount_start[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="discount_end">Discount End Date</label>
                                          <input
                                            type="datetime-local"
                                            className={errors.discount_end !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="discount_end"
                                            name="discount_end"
                                            value={input.discount_end}
                                            onChange={handleInput}
                                            placeholder="Enter discount end date"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.discount_end !== undefined ? errors.discount_end[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="stock">Product Stock</label>
                                          <input
                                            type="number"
                                            className={errors.stock !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="stock"
                                            name="stock"
                                            value={input.stock}
                                            onChange={handleInput}
                                            placeholder="Enter stock"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.stock !== undefined ? errors.stock[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>

                                      <div className='col-sm-6'>
                                        <div className="form-group">
                                          <label htmlFor="sku">Product SKU</label>
                                          <input
                                            type="text"
                                            className={errors.sku !== undefined ? "form-control form-control-border border-width-2 is-invalid" : "form-control form-control-border border-width-2"}
                                            id="sku"
                                            name="sku"
                                            value={input.sku}
                                            onChange={handleInput}
                                            placeholder="Enter sku"
                                          />
                                          <p className='text-danger'>
                                            <small>{errors.sku !== undefined ? errors.sku[0] : null}</small>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='col-sm-6'>
                                <div className="form-group">
                                  <label htmlFor="status">
                                    Status
                                  </label>
                                  <select
                                    className="custom-select form-control-border border-width-2"
                                    id="status"
                                    name="status"
                                    defaultValue={input.status}
                                    placeholder='Select option'
                                    onChange={handleInput}
                                  >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6">
                                <div className="form-group form-control-border border-width-2">
                                  <label>Description</label>
                                  <textarea className="form-control" value={input.description} onChange={handleInput}
                                            name='description' rows="3" placeholder="Enter ..."></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /.card-body */}
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                              {id ? 'Save Changes' : 'Save'}
                            </button>
                          </div>
                        </form>
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
        {/* /.container-fluid */}
      </section>
    </DefaultLayout>
  )
}

export default ProductForm

import {
  ActionButton,
  CardHeader,
  CategoryPhotoModal,
  DataTables,
  DefaultLayout,
  Images,
  Loader,
  Paginations,
  Search
} from "../../../components";
import {Link} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import endpoint from "../../../data/server";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";

const Category = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
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
  const getCategories = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`categories?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setCategories(res.data.data)
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
    getCategories()
  }, [])

  const handleInput = (e) => {
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  return (
    <DefaultLayout title='Categories'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='Category' link='/categories/create' value={input} onChange={handleInput}/>
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
                            <Search value={input} onClick={() => getCategories(1)} onChange={handleInput}/>
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
                                  Serial / Status
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Serial / Status
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
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Created By
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
                              {categories.map((category, index) => (
                                <tr key={index}>
                                  <td>{activePage + index}</td>
                                  <td className="dtr-control" tabIndex={index}>
                                    <div>
                                      <div className='text-primary'>Name: {category.name}</div>
                                      <div className='text-info'>Slug: {category.slug}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'>Serial: {category.serial}</div>
                                      <div className='text-info'>Status: {category.status}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <Images width={32} height={32} src={category.photo} alt={category.name}
                                            onClick={() => handlePhotoModal(category.photo_full)}/>
                                  </td>
                                  <td>{category.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {category.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {category.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton view url='categories' id={category.id}/>
                                  </td>
                                </tr>
                              ))}
                              </tbody>
                              <tfoot>
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
                                  Serial / Status
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Serial / Status
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
                                  aria-label="Engine version: activate to sort column ascending"
                                >
                                  Created By
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
                              </tfoot>
                            </table>
                          </>
                          )}
                      </div>
                    </div>
                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getCategories}
                      startFrom={startFrom}
                    />
                  </div>
                  <CategoryPhotoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Category Photo"
                    size
                    photo={modalPhoto}
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

export default Category

import {
  ActionButton,
  CardHeader,
  DefaultLayout,
  Images,
  Loader,
  NoDataFound,
  Paginations,
  Search,
  UserDetailsModal,
  UserLogoModal
} from "../../../components";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";
import toastAlert from "../../../data/toastAlert";

const Users = () => {
  const [loading, setLoading] = useState(false)

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDetails, setModalShowDetails] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [input, setInput] = useState({
    order_by: 'id',
    per_page: 10,
    direction: 'desc',
    search: ''
  })

  const handleLogoModal = (logo) => {
    setModalPhoto(logo)
    setModalShow(true)
  }

  const handleDetailsModal = (user) => {
    setUser(user)
    setModalShowDetails(true)
  }

  const getUsers = async (pageNumber = 1) => {
    setLoading(true)
    let searchQuery = `&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
    await axiosClient.get(`users?page=${pageNumber}${searchQuery}`).then(res => {
      setLoading(false)
      setUsers(res.data.data)
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
    getUsers()
  }, [])

  const handleInput = (e) => {
    setInput(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axiosClient.delete(`/users/${id}`).then(res => {
          setLoading(false)
          toastAlert(res.data.message)
          getUsers()
        }).catch(err => {
          setLoading(false)
          console.log(err)
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }

  return (
    <DefaultLayout title='Users'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader title='User List' link='/users/create'/>
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
                            <Search value={input} onClick={() => getUsers(1)} onChange={handleInput}/>
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
                                  Name
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Phone / Email
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example2"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Browser: activate to sort column ascending"
                                >
                                  Status
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
                                  Date/Time
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
                              {users && Object.keys(users).length > 0 ? users.map((user, index) => (
                                <tr key={index}>
                                  <td className="dtr-control" tabIndex={index}>{activePage + index}</td>
                                  <td>{user.name}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Phone: {user.phone}</small></div>
                                      <div className='text-info'><small>Email: {user.email}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Status: {user.status}</small></div>
                                      <div className='text-info'><small>Role: {user.role}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <Images width={32} height={32} src={user.photo_full} alt={user.name}
                                            onClick={() => handleLogoModal(user.photo_full)}/>
                                  </td>
                                  <td>{user.created_by}</td>
                                  <td>
                                    <div>
                                      <div className='text-primary'><small>Created: {user.created_at}</small></div>
                                      <div className='text-info'><small>Updated: {user.updated_at}</small></div>
                                    </div>
                                  </td>
                                  <td>
                                    <ActionButton
                                      url='users'
                                      id={user.id}
                                      handleDelete={() => handleDelete(user.id)}
                                      onClick={() => handleDetailsModal(user)}
                                      modalView />
                                  </td>
                                </tr>
                              )): (
                                <NoDataFound title='User' />
                              )}
                              </tbody>
                            </table>
                          </>
                          )}
                      </div>
                    </div>
                    <Paginations
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      onChange={getUsers}
                      startFrom={startFrom}
                    />
                  </div>
                  <UserLogoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="User Logo"
                    size
                    photo={modalPhoto}
                  />
                  <UserDetailsModal
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    title="User Details"
                    size='lg'
                    user={user}
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

export default Users

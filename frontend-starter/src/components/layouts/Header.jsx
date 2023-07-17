import {useEffect} from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import {Images} from "../";
import endpoint from "../../data/server";
import toastAlert from "../../data/toastAlert";
import {Link, Navigate} from "react-router-dom";

const Header= () => {
  const {user, token, setToken, setUser} = useStateContext()

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    const getUser = async () => {
      await axiosClient.get('/user').then(({data}) => {
        setUser(data)
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
    getUser()
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    await axiosClient.post('/logout').then(res => {
      setUser({})
      setToken(null)
      toastAlert('Logged out successfully')
    }).catch(err => {
      console.log(err)
    })
  }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="" role="button">
                        <i className="fas fa-bars" />
                    </a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Navbar Search */}
                <li className="nav-item d-none">
                    <a
                        className="nav-link"
                        data-widget="navbar-search"
                        href="#"
                        role="button"
                    >
                        <i className="fas fa-search" />
                    </a>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input
                                    className="form-control form-control-navbar"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search" />
                                    </button>
                                    <button
                                        className="btn btn-navbar"
                                        type="button"
                                        data-widget="navbar-search"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                {/* Messages Dropdown Menu */}
                <li className="nav-item dropdown d-none">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments" />
                        <span className="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media">
                                <img
                                    src="/assets/dist/img/user1-128x128.jpg"
                                    alt="User Avatar"
                                    className="img-size-50 mr-3 img-circle"
                                />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                                        <span className="float-right text-sm text-danger">
                    <i className="fas fa-star" />
                  </span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media">
                                <img
                                    src="/assets/dist/img/user8-128x128.jpg"
                                    alt="User Avatar"
                                    className="img-size-50 img-circle mr-3"
                                />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        John Pierce
                                        <span className="float-right text-sm text-muted">
                    <i className="fas fa-star" />
                  </span>
                                    </h3>
                                    <p className="text-sm">I got your message bro</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media">
                                <img
                                    src="/assets/dist/img/user3-128x128.jpg"
                                    alt="User Avatar"
                                    className="img-size-50 img-circle mr-3"
                                />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Nora Silvester
                                        <span className="float-right text-sm text-warning">
                    <i className="fas fa-star" />
                  </span>
                                    </h3>
                                    <p className="text-sm">The subject goes here</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item dropdown-footer">
                            See All Messages
                        </a>
                    </div>
                </li>
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell" />
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">
            15 Notifications
          </span>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2" /> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2" /> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2" /> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item dropdown-footer">
                            See All Notifications
                        </a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <Images src={`${endpoint.assets}/${user.photo}`} height={20} width={20} alt={user.name} />
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">
                    {user.name}
                  </span>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user mr-2" /> Profile
                  </Link>
                  <div className="dropdown-divider" />
                  <a href="#" onClick={handleLogout} className="dropdown-item dropdown-footer">
                    <i className='fa fa-lock'></i> Logout
                  </a>
                </div>
              </li>
            </ul>
        </nav>
    )
}

export default Header

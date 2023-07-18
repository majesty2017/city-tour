import {Link, useLocation} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Supplier Logo */}
            <Link to="/" className="brand-link">
                <img
                    src="/assets/dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">City<span className='text-warning text-lg'>.</span>Tour</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                      <li className="nav-header text-uppercase">Core</li>
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}>
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>
                      <li className="nav-header text-uppercase">Human Resources</li>
                      <li  className={`nav-item ${
                        location.pathname === '/users' && 'menu-open' ||
                        location.pathname === '/visitors' && 'menu-open' ||
                        location.pathname === '/suppliers' && 'menu-open' ||
                        location.pathname === '/sales-managers' && 'menu-open'
                      }`}>
                        <a href="#" className="nav-link">
                          <i className="nav-icon fas fa-table" />
                          <p>
                            HR
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <Link to="/users" className={`nav-link ${location.pathname === '/users' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Users</p>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/sales-managers" className={`nav-link ${location.pathname === '/sales-managers' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Sales Managers</p>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/visitors" className={`nav-link ${location.pathname === '/visitors' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Visitors</p>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/suppliers" className={`nav-link ${location.pathname === '/suppliers' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Suppliers</p>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-header text-uppercase">Products</li>
                      <li className={`nav-item ${
                        location.pathname === '/products' && 'menu-open' ||
                        location.pathname === '/trash' && 'menu-open'
                      }`}>
                        <a href="#" className="nav-link">
                          <i className="nav-icon fas fa-table" />

                          <p>
                            Products
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <Link to="/products" className={`nav-link ${location.pathname === '/products' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Products</p>
                            </Link>
                          </li>
                          <li className="nav-item d-none">
                            <Link to="/trash" className={`nav-link ${location.pathname === '/trash' && 'active'}`}>
                              <i className="fas fa-trash nav-icon" />
                              <p>Trash</p>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-header text-uppercase">Managament</li>
                        <li className={`nav-item ${
                          location.pathname === '/categories' && 'menu-open' ||
                          location.pathname === '/sub-categories' && 'menu-open' ||
                          location.pathname === '/brands' && 'menu-open' ||
                          location.pathname === '/product-attributes' && 'menu-open'
                        }`}>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-edit" />
                                <p>
                                    Product Settings
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <li className="nav-item">
                                  <Link to="/brands" className={`nav-link ${location.pathname === '/brands' && 'active'}`}>
                                    <i className="far fa-circle nav-icon" />
                                    <p>Brands</p>
                                  </Link>
                                </li>
                                <Link to="/categories" className={`nav-link ${location.pathname === '/categories' && 'active'}`}>
                                  <i className="far fa-circle nav-icon" />
                                  <p>Categories</p>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/sub-categories" className={`nav-link ${location.pathname === '/sub-categories' && 'active'}`}>
                                  <i className="far fa-circle nav-icon" />
                                  <p>Sub Categories</p>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/product-attributes" className={`nav-link ${location.pathname === '/product-attributes' && 'active'}`}>
                                  <i className="far fa-circle nav-icon" />
                                  <p>Product Attributes</p>
                                </Link>
                              </li>
                            </ul>
                        </li>
                        <li className="nav-header">STORE MANAGAMENT</li>
                        <li className={`nav-item ${
                          location.pathname === '/shops' && 'menu-open'
                        }`}>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-store" />
                                <p>
                                  Store
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                  <Link to="/shops" className={`nav-link ${location.pathname === '/shops' && 'active'}`}>
                                    <i className="far fa-circle nav-icon" />
                                    <p>Shops</p>
                                  </Link>
                                </li>
                            </ul>
                        </li>
                      <li className="nav-header">TICKETS</li>
                        <li className={`nav-item ${
                          location.pathname === '/orders' && 'menu-open'
                        }`}>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-store-alt" />
                                <p>
                                  Order
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                  <Link to="/orders" className={`nav-link ${location.pathname === '/orders' && 'active'}`}>
                                    <i className="far fa-circle nav-icon" />
                                    <p>Ticket</p>
                                  </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

export default Sidebar

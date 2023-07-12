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
                        location.pathname === '/suppliers' && 'menu-open'
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
                            <Link to="/suppliers" className={`nav-link ${location.pathname === '/suppliers' && 'active'}`}>
                              <i className="far fa-circle nav-icon" />
                              <p>Suppliers</p>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-header text-uppercase">Management</li>
                        <li className={`nav-item ${
                          location.pathname === '/categories' && 'menu-open' ||
                          location.pathname === '/sub-categories' && 'menu-open' ||
                          location.pathname === '/brands' && 'menu-open' ||
                          location.pathname === '/products' && 'menu-open'}`
                        }>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-edit" />
                                <p>
                                    Services
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
                                <Link to="/products" className={`nav-link ${location.pathname === '/products' && 'active'}`}>
                                  <i className="far fa-circle nav-icon" />
                                  <p>Products</p>
                                </Link>
                              </li>
                            </ul>
                        </li>
                        <li className="nav-header">EXAMPLES</li>
                        <li className="nav-item">
                            <a href="pages/calendar.html" className="nav-link">
                                <i className="nav-icon far fa-calendar-alt" />
                                <p>
                                    Calendar
                                    <span className="badge badge-info right">2</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/gallery.html" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p>Gallery</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/kanban.html" className="nav-link">
                                <i className="nav-icon fas fa-columns" />
                                <p>Kanban Board</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-envelope" />
                                <p>
                                    Mailbox
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/mailbox/mailbox.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Inbox</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/mailbox/compose.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Compose</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/mailbox/read-mail.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Read</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-book" />
                                <p>
                                    Pages
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/examples/invoice.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Invoice</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/profile.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Profile</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/e-commerce.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>E-commerce</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/projects.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Projects</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/project-add.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Project Add</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/project-edit.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Project Edit</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="pages/examples/project-detail.html"
                                        className="nav-link"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p>Project Detail</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/contacts.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Contacts</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/faq.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>FAQ</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/contact-us.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Contact us</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-plus-square" />
                                <p>
                                    Extras
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Login &amp; Register v1
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/examples/login.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Login v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/register.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Register v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="pages/examples/forgot-password.html"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Forgot Password v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="pages/examples/recover-password.html"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Recover Password v1</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Login &amp; Register v2
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/examples/login-v2.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Login v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="pages/examples/register-v2.html"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Register v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="pages/examples/forgot-password-v2.html"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Forgot Password v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="pages/examples/recover-password-v2.html"
                                                className="nav-link"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Recover Password v2</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/lockscreen.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Lockscreen</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="pages/examples/legacy-user-menu.html"
                                        className="nav-link"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p>Legacy User Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="pages/examples/language-menu.html"
                                        className="nav-link"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p>Language Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/404.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Error 404</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/500.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Error 500</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/pace.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Pace</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/blank.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Blank Page</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="starter.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Starter Page</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-search" />
                                <p>
                                    Search
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/search/simple.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Simple Search</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/search/enhanced.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Enhanced</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-header">MISCELLANEOUS</li>
                        <li className="nav-item">
                            <a href="iframe.html" className="nav-link">
                                <i className="nav-icon fas fa-ellipsis-h" />
                                <p>Tabbed IFrame Plugin</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://adminlte.io/docs/3.1/" className="nav-link">
                                <i className="nav-icon fas fa-file" />
                                <p>Documentation</p>
                            </a>
                        </li>
                        <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon" />
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-circle" />
                                <p>
                                    Level 1
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Level 2</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Level 2
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Level 2</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon" />
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-header">LABELS</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger" />
                                <p className="text">Important</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-warning" />
                                <p>Warning</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-info" />
                                <p>Informational</p>
                            </a>
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

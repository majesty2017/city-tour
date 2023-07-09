import {Breadcrumb, Footer, Header, Preloader, Sidebar} from "../";

const DefaultLayout= ({title, previous, url, children}) => {
    return (
        <div className="wrapper">
            {/* Navbar */}
            <Header />
            {/* /.navbar */}
            {/* Main Sidebar Container */}
            <Sidebar />
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <Breadcrumb title={title} previous={previous} url={url}  />
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                {children}
                {/* /.content */}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout

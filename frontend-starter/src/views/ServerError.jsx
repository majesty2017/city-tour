import {Link} from "react-router-dom";

const ServerError = () => {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>500 Error Page</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">500 Error Page</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-danger">500</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-danger" /> Oops!
                Something went wrong.
              </h3>
              <p>
                We will work on fixing that right away. Meanwhile, you may{" "}
                <Link to="/">return to back</Link> or try using the
                again later.
              </p>
            </div>
          </div>
          {/* /.error-page */}
        </section>
        {/* /.content */}
      </div>

    )
}

export default ServerError

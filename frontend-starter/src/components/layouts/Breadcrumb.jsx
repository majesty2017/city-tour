import {Link} from "react-router-dom";

const Breadcrumb = ({url, title, previous}) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Dashboard</h1>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                                <Link to="#">Dashboard</Link>
                            </li>
                            {previous && (
                                <li className="breadcrumb-item">
                                    <Link to={url}>{previous}</Link>
                                </li>
                            )}
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
        </>
    )
}

export default Breadcrumb

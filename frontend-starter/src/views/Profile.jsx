import {DefaultLayout} from "../components/index.js";

const Profile = () => {
    return (
        <DefaultLayout title='Profile'>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  {/* Profile Image */}
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src="/assets/dist/img/user4-128x128.jpg"
                          alt="User profile picture"
                        />
                      </div>
                      <h3 className="profile-username text-center">Nina Mcintire</h3>
                      <p className="text-muted text-center">Software Engineer</p>
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.col */}
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a className="nav-link" href="#settings" data-toggle="tab">
                            Settings
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="active tab-pane" id="settings">
                          <form className="form-horizontal">
                            <div className="form-group row">
                              <label
                                htmlFor="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Name
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="inputName"
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-2 col-form-label"
                              >
                                Email
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="inputEmail"
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputName2"
                                className="col-sm-2 col-form-label"
                              >
                                Name
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputName2"
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputExperience"
                                className="col-sm-2 col-form-label"
                              >
                                Experience
                              </label>
                              <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="inputExperience"
                        placeholder="Experience"
                        defaultValue={""}
                      />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputSkills"
                                className="col-sm-2 col-form-label"
                              >
                                Skills
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputSkills"
                                  placeholder="Skills"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-10">
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" /> I agree to the{" "}
                                    <a href="#">terms and conditions</a>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-10">
                                <button type="submit" className="btn btn-danger">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.tab-pane */}
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
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

export default Profile


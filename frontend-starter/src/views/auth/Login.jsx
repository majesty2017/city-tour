import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import toastAlert from "../../data/toastAlert.js";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const rememberRef = useRef()

  const {setUser, setToken} = useStateContext()

  const handleLogin = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      remember: rememberRef.current.value
    }
    axiosClient.post('/login', payload).then(({data}) => {
      setUser(data.user)
      setToken(data.token)
      navigate('/')
    }).catch(err => {
      const res = err.response
      if (res.data.message) {
        toastAlert(res.data.message, 'error')
      }
      if (res && res.status === 422) {
        const error = res.data.errors
        Object.keys(error).map(key => {
          toastAlert(error[key][0], 'error')
        })
      }
    })
  }

    return (
        <div className={'login-page'}>
          <div className="login-box">
            {/* /.login-logo */}
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <a href="" className="h1">
                  <b>Admin</b> Starter
                </a>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Sign in to your accounts</p>
                <form onSubmit={handleLogin}>
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" ref={emailRef} placeholder="Email" />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      ref={passwordRef}
                      className="form-control"
                      placeholder="Password"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" ref={rememberRef} id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </form>
                <p className="mb-1">
                  <Link to="/forgot-password">I forgot my password</Link>
                </p>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
    )
}

export default Login

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import API from '../../services/api';
import { isLoggedIn } from '../../utils/auth';
import logo from '../../assets/images/logo2.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', { username, password });

      const userData = {
        username,
        name: res.data.name,
        token: res.data.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('loginTime', new Date().getTime()); // Tambahkan waktu login!

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            </div>
            <h4>Hello! Let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <Form className="pt-3" onSubmit={handleSubmit}>
              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  size="lg"
                  className="h-auto"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="lg"
                  className="h-auto"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN IN
                </button>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                    <i className="input-helper"></i>
                    Keep me signed in
                  </label>
                </div>
                <a
                  href="#!"
                  onClick={(e) => e.preventDefault()}
                  className="auth-link text-black"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-block btn-facebook auth-form-btn"
                >
                  <i className="mdi mdi-facebook mr-2"></i>
                  Connect using Facebook
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                Don't have an account?{' '}
                <Link to="/user-pages/register" className="text-primary">
                  Create
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

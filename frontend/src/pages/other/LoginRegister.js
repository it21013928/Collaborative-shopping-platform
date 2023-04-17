import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import { login, registerAccount } from "../../api/auth";

const LoginRegister = () => {
  let { pathname } = useLocation();

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/my-account");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  // Register
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerAccount(data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLoginSubmit}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div>
                                <input
                                  type="text"
                                  name="user-name"
                                  placeholder="Username"
                                  {...register("name", { required: true })}
                                />
                                {errors.name && (
                                  <span>This field is required</span>
                                )}
                              </div>
                              <div>
                                <input
                                  name="user-email"
                                  placeholder="Email"
                                  type="email"
                                  {...register("email", { required: true })}
                                />
                                {errors.email && (
                                  <span>This field is required</span>
                                )}
                              </div>
                              <div>
                                <input
                                  type="password"
                                  name="user-password"
                                  placeholder="Password"
                                  {...register("password", {
                                    required: true,
                                    pattern:
                                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                  })}
                                />
                                {errors.password?.type === "required" && (
                                  <span>This field is required</span>
                                )}
                                {errors.password?.type === "pattern" && (
                                  <span>
                                    Password must contain at least 8 characters
                                    including lowercase, uppercase, and special
                                    characters.
                                  </span>
                                )}
                              </div>
                              <div>
                                <input
                                  type="password"
                                  name="user-password"
                                  placeholder="Password"
                                  {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) =>
                                      value === watch("password"),
                                  })}
                                />
                                {errors.confirmPassword?.type ===
                                  "required" && (
                                  <span>This field is required</span>
                                )}
                                {errors.confirmPassword?.type ===
                                  "validate" && (
                                  <span>Passwords do not match</span>
                                )}
                              </div>

                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;

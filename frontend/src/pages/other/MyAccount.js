import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { myAccount, updateUser } from "../../api/user";

import { useForm } from "react-hook-form";

import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const MyAccount = () => {
  let { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [role, setRole] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await myAccount(token);
          if (!userData) {
            navigate("/login-register");
          } else {
            await setUser(userData);
            await setRole(user.role);
          }
        } else {
          navigate("/login-register");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Register

  function UserForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onUserUpdateSubmit = async (data) => {
      try {
        console.log(data);
        await updateUser(data);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(onUserUpdateSubmit)}>
        <div className="myaccount-info-wrapper">
          <div className="account-info-wrapper">
            <h4>My Account Information</h4>
            <h5>Your Personal Details</h5>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  onChange={handleNameChange}
                  {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  onChange={handleEmailChange}
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="billing-info">
                <label>Address</label>
                <input
                  type="text"
                  defaultValue={user.address}
                  onChange={handleAddressChange}
                  {...register("address", { required: true })}
                />
                {errors.address && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Telephone</label>
                <input
                  type="text"
                  defaultValue={user.phone}
                  onChange={handlePhoneChange}
                  {...register("phone", { required: true })}
                />
                {errors.phone && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>City</label>
                <input
                  type="text"
                  defaultValue={user.city}
                  onChange={handleCityChange}
                  {...register("city", { required: true })}
                />
                {errors.city && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="billing-info">
                <label>Zip code</label>
                <input
                  type="text"
                  defaultValue={user.zipCode}
                  onChange={handleZipCodeChange}
                  {...register("zipCode", { required: true })}
                />
                {errors.zipCode && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit">Update</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  function UserPasswordForm() {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onUserPasswordUpdateSubmit = async (data) => {
      try {
        console.log(data);
        await updateUser(data);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(onUserPasswordUpdateSubmit)}>
        <div className="myaccount-info-wrapper">
          <div className="account-info-wrapper">
            <h4>Change Password</h4>
            <h5>Your Password</h5>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="billing-info">
                <label>Password</label>
                <input
                  type="password"
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
                    Password must contain at least 8 characters including
                    lowercase, uppercase, and special characters.
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="billing-info">
                <label>Password Confirm</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <span>This field is required</span>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <span>Passwords do not match</span>
                )}
              </div>
            </div>
          </div>
          <div className="billing-back-btn">
            <div className="billing-btn">
              <button type="submit">Update</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  function UserRoleForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onUserRoleUpdateSubmit = async (data) => {
      try {
        console.log(data);
        await updateUser(data);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(onUserRoleUpdateSubmit)}>
        <div className="myaccount-info-wrapper">
          <div className="entries-wrapper">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                <div className="entries-info text-center">
                  <p>
                    Currently you have privileges to use our website as a
                    customer. But you can be eligible to be a seller on our
                    website. Make a request if you are interested.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                <div className="entries-edit-delete text-center">
                  <input
                    type="hidden"
                    {...register("role", {
                      value: "seller-pending",
                    })}
                  />
                  <button type="submit">Request Seller Position</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  if (!user) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <UserForm />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <UserPasswordForm />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        Become a seller
                      </Accordion.Header>
                      <Accordion.Body>
                        <UserRoleForm />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;

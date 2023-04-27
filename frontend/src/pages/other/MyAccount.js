import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Grid,
} from "@mui/material";
import { MdLocationOn } from "react-icons/md";
import { MdLocationOff } from "react-icons/md";
import { myAccount, updateUser } from "../../api/user";
import Model from "react-modal";
import { useForm } from "react-hook-form";

import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import order from "../../api/order";
import "./index.css";
import axios from "axios";

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
  const [uuid, setUuid] = useState(null);
  const [trackingUUIDData, setTrackingUUIDData] = useState([]);
  const [trackingData, setTrackingData] = useState([]);
  const [deliveryOrder, setDeliveryOrder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const service = new order();
  const [orders, setOrders] = useState(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await myAccount(token);
          console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
          console.log(userData);

          if (!userData) {
            navigate("/login-register");
          } else {
            await service.getOrdersByCusID(userData.id).then((Orderdetails) => {
              setOrders(Orderdetails.data);
              console.log(Orderdetails.data);
            });
            setUser(userData);
            setRole(user.role);
            console.log("AAAAAAAAAAAAAAAAAAAAAAA");
            console.log(user.id);
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

  async function trackOrder(id, track) {
    if (track != "Tracked") {
    } else {
      await service.getDelivery(id).then((Deliverydetails) => {
        setDeliveryOrder(Deliverydetails.data[0]);
        console.log(Deliverydetails.data[0]);

        const apiKey =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5ZjBhOTJiMC1lMzgxLTExZWQtYTQxZi05ZDE3OTM1NWJjZjIiLCJzdWJJZCI6IjY0NDdmN2Y5NWQ1NzIzNGFlMDIxODNjNyIsImlhdCI6MTY4MjQzODEzN30.2tV7cs9pfXJiYx5mdlAP8xWw-8XioHH6MvvVh-8N5ek";
        const trackingUrl = "https://parcelsapp.com/api/v3/shipments/tracking";
        const shipments = [
          {
            trackingId: Deliverydetails.data[0].TrackingNo,
            language: "en",
            country: "United States",
          },

          // ...
        ];

        const initiateTracking = async () => {
          try {
            const response = await axios.post(trackingUrl, {
              apiKey,
              shipments,
            });
            const { uuid } = response.data;
            console.log("aAAAAAAAAAAAA");
            console.log(response.data);

            if (response.data.shipments.length != 0) {
              await axios.patch(
                `http://localhost:8000/orders/update/${localStorage.getItem(
                  "orderID"
                )}`,
                {
                  status: response.data.shipments[0].status,
                }
              );
              setTrackingUUIDData(response.data.shipments[0].states);
            }
            setUuid(uuid);
          } catch (error) {
            console.error(error);
          }
        };

        initiateTracking();
      });

      const checkTrackingStatus = async () => {
        try {
          const response = await axios.get(
            `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5ZjBhOTJiMC1lMzgxLTExZWQtYTQxZi05ZDE3OTM1NWJjZjIiLCJzdWJJZCI6IjY0NDdmN2Y5NWQ1NzIzNGFlMDIxODNjNyIsImlhdCI6MTY4MjQzODEzN30.2tV7cs9pfXJiYx5mdlAP8xWw-8XioHH6MvvVh-8N5ek`
          );
          const { done } = response.data;
          if (done) {
            console.log("Tracking complete");
            console.log(response.data);
            await axios.patch(
              `http://localhost:8000/orders/update/${localStorage.getItem(
                "orderID"
              )}`,
              {
                status: response.data.shipments[0].status,
              }
            );
            setTrackingData(response.data.shipments[0].states);
            console.log(response.data);
          } else {
            console.log("Tracking in progress...");
            setTimeout(checkTrackingStatus, 1000);
          }
        } catch (error) {
          console.error(error);
        }
      };

      if (uuid) {
        checkTrackingStatus();
      }
      setVisible(true);
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1,
    },

    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "button",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return <Button color="secondary">Track Order</Button>;
      },
    },
  ];
  const getRowId = (row) => row._id;

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
                    customer. But if you can be eligible to be a seller on our
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
    <div>
      <Model
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          overlay: {
            backdropFilter: "blur(5px)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",

            background: "#9c9c9c",
            transform: "translate(-50%, -50%)",
            height: "500px",
            borderRadius: "100px",
          },
        }}
      >
        <div className="spacer">
          <h3 style={{ marginBottom: "35px" }}>
            <u>Tracking details</u>
          </h3>
          {trackingUUIDData.length != 0
            ? trackingUUIDData.map((data, index) => {
                const dateString = data.date;
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // add 1 because getMonth() returns 0-based month index
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();

                return (
                  <div>
                    <Box>
                      <Grid container spacing={0}>
                        <Grid item xs={2}>
                          <Grid container spacing={0}>
                            <Grid item xs={12}>
                              {year}-{month}-{day}
                            </Grid>
                            <Grid item xs={12}>
                              {hour}-{minute}-{second}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}>
                          {index === 0 ? (
                            <MdLocationOn style={{ fontSize: "25px" }} />
                          ) : (
                            <MdLocationOff style={{ fontSize: "25px" }} />
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          {data.status}
                        </Grid>
                      </Grid>
                    </Box>
                    <hr style={{ width: "70%" }} />
                  </div>
                );
              })
            : trackingData.map((data, index) => {
                const dateString = data.date;
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // add 1 because getMonth() returns 0-based month index
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();

                return (
                  <div>
                    <Box>
                      <Grid container spacing={0}>
                        <Grid item xs={2}>
                          <Grid container spacing={0}>
                            <Grid item xs={12}>
                              {year}-{month}-{day}
                            </Grid>
                            <Grid item xs={12}>
                              {hour}-{minute}-{second}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}>
                          {index === 0 ? (
                            <MdLocationOn style={{ fontSize: "25px" }} />
                          ) : (
                            <MdLocationOff style={{ fontSize: "25px" }} />
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          {data.status}
                        </Grid>
                      </Grid>
                    </Box>
                    <hr style={{ width: "70%" }} />
                  </div>
                );
              })}
        </div>
      </Model>
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

                      <Accordion.Item
                        eventKey="3"
                        className="single-my-account mb-20"
                      >
                        <Accordion.Header className="panel-heading">
                          Modify your address book entries
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        eventKey="5"
                        className="single-my-account mb-20"
                      >
                        <Accordion.Header className="panel-heading">
                          View Orders
                        </Accordion.Header>
                        <Accordion.Body>
                          <table>
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Placed Date</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((data) => {
                                return (
                                  <tr>
                                    <td>{data._id}</td>
                                    <td>{data.Status}</td>
                                    <td>{data.Date}</td>
                                    <td>
                                      {data.Tracking === "Tracked" ? (
                                        <button
                                          class="table-button"
                                          onClick={() =>
                                            trackOrder(data._id, data.Tracking)
                                          }
                                        >
                                          Track order
                                        </button>
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
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
    </div>
  );
};

export default MyAccount;

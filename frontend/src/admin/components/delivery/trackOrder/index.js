import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Grid,
} from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import order from "../../../../api/order";
import "./index.css";
import Model from "react-modal";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdLocationOn } from "react-icons/md";
import { MdLocationOff } from "react-icons/md";

export default function () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const service = new order();

  const [singleOrder, setSingleOrder] = useState("");
  const [deliveryOrder, setDeliveryOrder] = useState("");
  const [productList, setProductList] = useState(null);
  const [count, setCount] = useState(0);

  // tracking code start

  const [uuid, setUuid] = useState(null);
  const [trackingUUIDData, setTrackingUUIDData] = useState([]);
  const [trackingData, setTrackingData] = useState([]);

  useEffect(async () => {
    await service
      .getDelivery(localStorage.getItem("orderID"))
      .then((Deliverydetails) => {
        setDeliveryOrder(Deliverydetails.data[0]);

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
  }, []);

  useEffect(() => {
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
  }, [uuid]);

  // tracking code end
  useEffect(async () => {
    await service
      .getSingleOrder(localStorage.getItem("orderID"))
      .then((Orderdetails) => {
        setSingleOrder(Orderdetails.data[0]);
        console.log(Orderdetails.data[0]);
      });
  }, []);

  useEffect(() => {}, [singleOrder]);

  useEffect(async () => {
    await service
      .getOrderProducts(localStorage.getItem("orderID"))
      .then((Productdetails) => {
        setProductList(Productdetails.data);
        console.log(Productdetails.data);
      });
  }, []);

  useEffect(() => {}, [productList]);

  const columns = [
    {
      field: "ProductID",
      headerName: "Product ID",
      flex: 1,
    },
    {
      field: "ProductName",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1,
    },
  ];
  const getRowId = (row) => row._id;

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="auto"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex="4">
              <div style={{ marginBottom: "15px" }}>
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.greenAccent[400]}
                >
                  <i>
                    <u>Order details</u>
                  </i>
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Order id :
                </Typography>
                {"  "}
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  style={{ display: "inline" }}
                >
                  {/* {singleOrder[0]._id} */}
                  {singleOrder._id}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Order placed date :
                </Typography>{" "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  {singleOrder.Date}
                </Typography>
              </div>

              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Reciever Name :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  {singleOrder.CustomerName}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Reciever address :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  {singleOrder.ShipingAddress}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Contact Number :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  {singleOrder.Phone}
                </Typography>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.greenAccent[400]}
                >
                  <i>
                    <u>Tracking Activity</u>
                  </i>
                </Typography>
              </div>

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
                        <div className="spacer">
                          <Grid container spacing={0}>
                            <Grid item xs={1.8}>
                              <Grid container spacing={0}>
                                <Grid item xs={8}>
                                  <Typography
                                    style={{ display: "inline" }}
                                    variant="h5"
                                    fontWeight="400"
                                    color={colors.grey[100]}
                                  >
                                    {year}-{month}-{day}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    style={{ display: "inline" }}
                                    variant="h5"
                                    fontWeight="400"
                                    color={colors.grey[100]}
                                  >
                                    {hour} : {minute} : {second}
                                  </Typography>
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
                            <Grid item xs={6}>
                              <Typography
                                color={colors.grey[100]}
                                variant="h4"
                                style={{ display: "inline" }}
                              >
                                {data.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
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
                        <div className="spacer">
                          <Grid container spacing={0}>
                            <Grid item xs={1.8}>
                              <Grid container spacing={0}>
                                <Grid item xs={8}>
                                  <Typography
                                    style={{ display: "inline" }}
                                    variant="h5"
                                    fontWeight="400"
                                    color={colors.grey[100]}
                                  >
                                    {year}-{month}-{day}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    style={{ display: "inline" }}
                                    variant="h5"
                                    fontWeight="400"
                                    color={colors.grey[100]}
                                  >
                                    {hour} : {minute} : {second}
                                  </Typography>
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
                            <Grid item xs={6}>
                              <Typography
                                color={colors.grey[100]}
                                variant="h4"
                                style={{ display: "inline" }}
                              >
                                {data.status}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                        <hr style={{ width: "70%" }} />
                      </div>
                    );
                  })}

              <div style={{ marginBottom: "15px", marginTop: "15px" }}>
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.greenAccent[400]}
                >
                  <i>
                    <u>Product list</u>
                  </i>
                </Typography>
              </div>

              <Box
                m="80px 0 0 0"
                height="40vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                {productList ? (
                  <DataGrid
                    rows={productList}
                    columns={columns}
                    getRowId={getRowId}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

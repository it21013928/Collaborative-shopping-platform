import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import order from "../../../../api/order";
import "./index.css";
import Model from "react-modal";
import Axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function () {
  // const orderID = localStorage.getItem("orderID");
  // console.log("FFFFFFFF" + orderID);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const service = new order();

  const [singleOrder, setSingleOrder] = useState("");
  const [productList, setProductList] = useState(null);

  const [file, setfileName] = useState("");

  const [visible, setVisible] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [fileExtension, setfileExtension] = useState("");

  // setOrderID(localStorage.getItem("orderID"));

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

  console.log("AAAAAAAAAAAAAAAAAAA");
  console.log(singleOrder.CustomerID);
  // console.log(singleOrder[0].CustomerID);
  // const sendDataToAPI =
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

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
    setfileName(e.target.files[0].name);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);
    console.log("ssssssssssssssssss");
    console.log(values.trackingNumber);
    console.log("mmmmmmmmmmmmmmmmmmmmmm");
    // setOrderID(localStorage.getItem("orderID"));

    // setTrackingNo(values.trackingNumber);
    // setServiceName(values.serviceName);
    // setExpectedDate(values.deliveryDate);
    console.log("bbbbbbbbb");
    console.log(orderId);
    console.log(trackingNo);
    console.log(serviceName);
    console.log(expectedDate);

    const orderId = localStorage.getItem("orderID");
    const trackingNo = values.trackingNumber;
    const serviceName = values.serviceName;

    const expectedDate = values.deliveryDate;
    const status = "shipped";

    // setFileData(values.reciptUpload.target.files[0]);
    // setfileName(values.reciptUpload.target.files[0].name);
    console.log("CCCCCCCCCCCCCCC");

    console.log("AAAAAAAA");
    // e.preventDefault();
    if (true) {
      const data = new FormData();

      data.append("image", fileData);
      console.log("BBBBBBBBBBBB");
      console.log(fileData);
      fetch("http://localhost:8002/trackingBill", {
        method: "POST",
        body: data,
      })
        .then((result) => {
          console.log(result);
          console.log("File sent successful");
          console.log(fileData);
          // setfileName("");
          // setFileData(null);
        })
        .catch((error) => {
          console.log(error.message);
        });

      await Axios.post("http://localhost:8000/delivery/", {
        orderId,
        trackingNo,
        serviceName,
        expectedDate,
        status,
        file,
      });
      await Axios.patch(`http://localhost:8000/orders/update/${orderId}`, {
        status,
      });
      console.log("CCCCCCCCCC");
      window.location.href = "/toBeDelivery";
    }
  };

  return (
    <Box>
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
            marginRight: "-50%",
            background: colors.primary[400],
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Box m="20px">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              defaultValue,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tracking number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.trackingNumber}
                    name="trackingNumber"
                    error={!!touched.trackingNumber && !!errors.trackingNumber}
                    helperText={touched.trackingNumber && errors.trackingNumber}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Delivery Service Name"
                    onBlur={handleBlur}
                    backgroundColor="white"
                    value={values.serviceName}
                    onChange={handleChange}
                    name="serviceName"
                    error={!!touched.serviceName && !!errors.serviceName}
                    helperText={touched.serviceName && errors.serviceName}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Expected delivery date"
                    onBlur={handleBlur}
                    backgroundColor="white"
                    value={values.deliveryDate}
                    onChange={handleChange}
                    name="deliveryDate"
                    InputLabelProps={{ shrink: true }}
                    error={!!touched.deliveryDate && !!errors.deliveryDate}
                    helperText={touched.deliveryDate && errors.deliveryDate}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    type="file"
                    label="Upload tracking recipt"
                    onBlur={handleBlur}
                    id="imageFile"
                    name="reciptUpload"
                    sx={{ gridColumn: "span 4" }}
                    defaultValue={values.reciptUpload}
                    InputLabelProps={{ shrink: true }}
                    onChange={fileChangeHandler}
                    required
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        {/* 
        <form>
          <input
            type="text"
            name="trackingNo"
            onChange={(e) => setTrackingNo(e.target.value)}
          />
          <input
            className="form-control"
            type="file"
            id="imageFile"
            onChange={fileChangeHandler}
            name="image"
          />

          <Button onClick={sendDataToAPI} color="secondary" variant="contained">
            Submit
          </Button>
        </form> */}
      </Model>
      {/* GRID & CHARTS */}
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
                  Current Status :
                </Typography>{" "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  {singleOrder.Status}
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
      <div className="buttonADJ">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setVisible(true)}
        >
          Enter tracking details
        </Button>
      </div>
    </Box>
  );
}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  trackingNumber: yup.string().required("required"),
  serviceName: yup.string().required("required"),
  deliveryDate: yup
    .date()
    .required("required")
    .min(new Date(), "Date cannot be in the past"),
});
const initialValues = {
  trackingNumber: "",
  serviceName: "",
  deliveryDate: "",
  reciptUpload: "",
};

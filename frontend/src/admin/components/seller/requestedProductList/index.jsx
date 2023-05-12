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

  const [visible, setVisible] = useState(false);

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
      .getSellerOrderProduct(
        localStorage.getItem("sellerID"),
        localStorage.getItem("orderID")
      )
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

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box>
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
    </Box>
  );
}

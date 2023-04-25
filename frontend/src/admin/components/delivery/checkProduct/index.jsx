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
  const [status, setStatus] = useState("No");

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

  useEffect(() => {
    changeState();
  }, []);

  useEffect(() => {}, [productList]);

  async function changeState() {
    await service
      .getOrderProducts(localStorage.getItem("orderID"))
      .then((Productdetails) => {
        setProductList(Productdetails.data);
        console.log(Productdetails.data);
      });
  }

  console.log("AAAAAAAAAAAAAAAAAAA");
  console.log(singleOrder.CustomerID);
  // console.log(singleOrder[0].CustomerID);
  // const sendDataToAPI =

  async function setProductStatus(id) {
    var productCount;
    var oID = localStorage.getItem("orderID");
    await service.getSingleOrder(oID).then(async (Orderdetails) => {
      productCount = Orderdetails.data[0].ProductCount;
      productCount = productCount - 1;
      console.log("AAAAAAAAAAAAAAAAAA");
      console.log(Orderdetails.data[0]);
      console.log(Orderdetails.data[0].productCount);
      console.log(productCount);

      await Axios.patch(`http://localhost:8000/orders/updateCount/${oID}`, {
        productCount,
      }).then(async () => {
        if (productCount == 0) {
          await Axios.patch(`http://localhost:8000/orders/update/${oID}`, {
            status: "Ready to Ship",
          }).then(async () => {
            await Axios.patch(
              `http://localhost:8000/orders/orderProduct/updateStatus/${id}`,
              {
                status: "received",
              }
            );
          });
        } else {
          await Axios.patch(
            `http://localhost:8000/orders/orderProduct/updateStatus/${id}`,
            {
              status: "received",
            }
          );
        }
      });
    });

    // window.location.href = "/checkProduct";
    changeState();
  }
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
    {
      field: "sellerID",
      headerName: "Seller ID",
      flex: 1,
    },
    {
      field: "button",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        if (params.row.Confirmation == "Not Recieved") {
          return (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setProductStatus(params.row._id)}
            >
              Recieved
            </Button>
          );
        } else {
          return (
            <Typography
              style={{ display: "inline" }}
              variant="h7"
              fontWeight="200"
              color={colors.greenAccent[400]}
            >
              Product Received
            </Typography>
          );
        }
      },
    },
  ];
  const getRowId = (row) => row._id;

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

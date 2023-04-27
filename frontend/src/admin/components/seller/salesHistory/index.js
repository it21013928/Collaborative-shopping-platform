import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../Layout/Header";
import { useEffect, useState } from "react";
import order from "../../../../api/order";
import { Link } from "react-router-dom";

export default function () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const service = new order();

  const [orders, setOrders] = useState(null);
  const [productList, setProductList] = useState(null);
  const [sellerID, setSellerID] = useState("S02");

  useEffect(async () => {
    await service.getRSellerProduct(sellerID).then(async (productList) => {
      setProductList(productList.data);
      const arr = productList.data;
      const size = arr.length;
      console.log(arr);
      console.log(arr.OrderID);
      const orderList = [];
      for (var i = 0; i < size; i++) {
        await service.getSingleOrder(arr[i].OrderID).then((orders) => {
          if (!orderList.some((obj) => obj._id === orders.data[0]._id))
            orderList.push(orders.data[0]);
        });
      }
      setOrders(orderList);
    });
  }, []);

  useEffect(() => {}, [orders]);

  const handleButtonClick = (id) => {
    localStorage.setItem("orderID", id);
    localStorage.setItem("sellerID", sellerID);
    window.location.href = "/requestedProductList";
    // perform action with the id
  };

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "CustomerID",
      headerName: "Customer ID",
      flex: 1,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
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
        return (
          <Button
            color="secondary"
            onClick={() => handleButtonClick(params.row._id)}
          >
            View Products
          </Button>
        );
      },
    },
  ];
  const getRowId = (row) => row._id;
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        {orders ? (
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={getRowId}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
}

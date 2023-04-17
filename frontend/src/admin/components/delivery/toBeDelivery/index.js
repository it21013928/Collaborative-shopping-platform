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

export default function () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const service = new order();

  const [orders, setOrders] = useState(null);

  useEffect(async () => {
    await service.getPaidOrders().then((Orderdetails) => {
      setOrders(Orderdetails.data);
      console.log(Orderdetails.data);
    });
  }, []);

  useEffect(() => {}, [orders]);
  const handleButtonClick = (id) => {
    console.log(`Button clicked for row with id ${id}`);
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
            Ship now
          </Button>
        );
      },
    },
  ];
  const getRowId = (row) => row.CustomerID;
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
        }}
      >
        {orders ? (
          <DataGrid
            rows={orders}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={getRowId}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
}

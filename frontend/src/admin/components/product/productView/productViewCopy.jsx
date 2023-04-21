import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../Layout/Header";
import { useEffect, useState } from "react";
import product from "../../../../api/product";
import { Link } from "react-router-dom";

export default function () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        await setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
  }, [products]);

  const columns = [
    { 
      field: "productId", 
      headerName: "ID", 
      flex: 2 },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "shortDescription",
      headerName: "Short Description",
      flex: 2,
    },
    {
      field: "saleCount",
      headerName: "Sale Count",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
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

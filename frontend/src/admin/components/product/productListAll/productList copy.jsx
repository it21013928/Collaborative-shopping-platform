import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";
import product from "../../../../api/product";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const service = new product();
  const [products, setProducts] = useState(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getProducts();
  //       await setProducts(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  // }, [products]);

  
  useEffect( async () => {
    await service.getAllProducts().then((Productdetails) => {
    setProducts(Productdetails.data);
    console.log(Productdetails.data);
    });
  }, []);

  useEffect(() => {}, [products]);


  const columns = [
    { 
      field: "productId", 
      headerName: "ID", 
      flex: 1 },
    {
      field: "name",
      headerName: "Product Name",
      flex: 2,
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
      field: "saleCount",
      headerName: "Sale Count",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "button",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={{ pathname: `/productDetails/${params.row._id}`}}>
            <Button color="secondary">View Details</Button>
          </Link>
          
        );
      },
    },
  ];

  const getRowId = (row) => row.productId;
  
  
  return (
    
    <Box m="0">
      <Box
        m="0 0 0 0"
        height="100vh"
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
        {products ?
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}
          
          
        />
        : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Products;

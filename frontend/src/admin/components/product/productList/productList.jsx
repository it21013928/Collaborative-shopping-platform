import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";
import product from "../../../../api/product";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUserId } from "../../../../api/user";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const service = new product();
  const [products, setProducts] = useState(null);

  const [user, setUser] = useState(''); 
  
  // const userId = user.id;
  // console.log(userId);

  //fetch user ID
useEffect( () => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await getUserId(token);
          if (!userData) {
            navigate("/login-register");
          } else {
            await setUser(userData);
            const Productdetails = await service.getProductBySeller(user.id)
            await setProducts(Productdetails.data);
            console.log(user.id);
            console.log(Productdetails.data);
            
          }
        } else {
          navigate("/login-register");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, [products]);

  // useEffect( async () => {
  //   await service.getProductBySeller(user.id).then((Productdetails) => {
  //   setProducts(Productdetails.data);
  //   console.log(Productdetails.data);
  //   });
  // }, []);

  // useEffect(() => {}, [products]);


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
      field: "userId",
      headerName: "Seller ID",
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

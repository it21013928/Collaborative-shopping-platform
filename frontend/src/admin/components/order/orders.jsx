import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { getCustomers } from "../../../api/user";
//import { getOrders } from "../../../api/order";
import Header from "../../Layout/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';



const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    // Function to fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/getOrdersByStatus/Pending`); // Replace '/api/orders' with your backend API endpoint for fetching orders
        setOrders(response.data); // Set the orders data to state
      } catch (error) {
        console.error(error); // Log any errors to the console
      }
    };

    fetchOrders(); // Call the fetchOrders function
  }, ); // Empty dependency array to run the effect only once, equivalent to componentDidMount

  useEffect(() => {
    // Code to run when orders state changes
    // console.log(orders);
  }, [orders]);

  const handleButtonClick = (id) => {
     axios.patch(`http://localhost:8000/orders/confirm/${id}`)
    // perform action with the id
  };

  

  

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      
    },
    {
      field: "Date",
      headerName: "Date created",
      flex: 1,
    },
    {
      field: "ShipingAddress",
      headerName: "Shipping Address",
      flex: 1,
    },

    {
      field: "button",
      headerName: "Action",
      width:100,
      renderCell:(params)=>{
        return(
          <Button
          color="secondary"
          onClick={() => handleButtonClick(params.row._id)}
          >Confirm</Button>
        )
      }
      
    },

    
    
     
    
  ];
  const getRowId = (row) => row.CustomerID;

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
        {orders ?
        <DataGrid
          rows={orders}
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

export default Orders;

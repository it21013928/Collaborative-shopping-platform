import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { getSellers } from "../../../api/user";
import Header from "../../Layout/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Model from "react-modal";

const Sellers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sellers, setSellers] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getSellers();
        await setSellers(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSellers();
  }, []);

  useEffect(() => {
    // console.log(customers);
  }, [sellers]);

  const handleButtonClick = (id) => {
    setVisible(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 2,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
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
            onClick={() => handleButtonClick(params.row.id)}
          >
            View{" "}
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="0">
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
        {" "}
        <p>Hello</p>
      </Model>
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
        {sellers ? (
          <DataGrid
            rows={sellers}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Sellers;

import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme,
    TextField,
    Grid,
  } from "@mui/material";
  import { DataGrid, GridToolbar } from "@mui/x-data-grid";
  import { tokens } from "../../theme";
  import { mockDataContacts } from "../../data/mockData";
  import { getPendingSellers, approveSeller} from "../../../api/user";
  import Header from "../../Layout/Header";
  
  import { useEffect, useState, useRef } from "react";
  import Model from "react-modal";
  
  // import "./index.css";
  // import Propic from "./assert/profilePic.jpg";
  
  const PendingSellers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [pendingSellers, setPendingSellers] = useState(null);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const fetchPendingSellers = async () => {
        try {
          const response = await getPendingSellers();
          await setPendingSellers(response);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPendingSellers();
    }, []);
  
    useEffect(() => {
      // console.log(customers);
    }, [pendingSellers]);
  
    const handleButtonClick = (id) => {
      approveSeller(id);
      window.location.reload();
    };
  
    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
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
        flex: 2,
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
        field: "button",
  
        headerName: "",
  
        width: 100,
  
        renderCell: (params) => {
          return (
            <Button
              color="secondary"
              onClick={() => handleButtonClick(params.row.id)}
            >
              Approve{" "}
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
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              transform: "translate(-50%, -50%)",
              borderRadius: "60px",
            },
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex="4">
              <div style={{ marginBottom: "40px" }}>
                <Typography
                  style={{ display: "inline" }}
                  variant="h3"
                  fontWeight="600"
                  color={colors.greenAccent[400]}
                >
                  <i>
                    <u>Seller details</u>
                  </i>
                </Typography>
              </div>
              <Grid container spacing={0}>
                <Grid item xs={5}>
                  <img 
                  // src={Propic} 
                  style={{ width: "120px" }} alt="My Image" />
                </Grid>
                <Grid item xs={6}>
                  <div className="spacer">
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <Typography
                          style={{ display: "inline" }}
                          variant="h4"
                          fontWeight="400"
                          color={colors.grey[100]}
                        >
                          Seller id :
                        </Typography>
                      </Grid>
                      {"  "}
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          color={colors.grey[100]}
                          style={{ display: "inline" }}
                        >
                          Ufadsfsdf65656f456df45
                          {/* {singleOrder[0]._id} */}
                          {/* {singleOrder._id} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="spacer">
                    {" "}
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <Typography
                          style={{ display: "inline" }}
                          variant="h4"
                          fontWeight="400"
                          color={colors.grey[100]}
                        >
                          Seller Name :
                        </Typography>{" "}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          color={colors.grey[100]}
                          variant="h5"
                          style={{ display: "inline" }}
                        >
                          Udesh Piyumatha
                          {/* {singleOrder.Date} */}
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
  
              <div className="spacer" style={{ marginTop: "10px" }}>
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Address :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  4534/A5c , efasscsf ,afdsasdsscs
                  {/* {singleOrder.ShipingAddress} */}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Email :
                </Typography>{" "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  udeshPiyumantha@gmail.com
                  {/* {singleOrder.Status} */}
                </Typography>
              </div>
  
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Phone :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  0755454654
                  {/* {singleOrder.CustomerName} */}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Zip Code :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  116000
                  {/* {singleOrder.Phone} */}
                </Typography>
              </div>
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  City :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  Colombo
                  {/* {singleOrder.Phone} */}
                </Typography>
              </div>
  
              <div className="spacer">
                <Typography
                  style={{ display: "inline" }}
                  variant="h4"
                  fontWeight="400"
                  color={colors.grey[100]}
                >
                  Role :
                </Typography>
                {"  "}
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  style={{ display: "inline" }}
                >
                  Manager
                  {/* {singleOrder.Phone} */}
                </Typography>
              </div>
            </Box>
          </Box>
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
          {pendingSellers ? (
            <DataGrid
              rows={pendingSellers}
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
  
  export default PendingSellers;
  
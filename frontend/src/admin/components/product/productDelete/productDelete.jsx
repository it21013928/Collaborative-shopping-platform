import { Box, Button, IconButton, TextField, InputLabel, Select, Typography, useTheme, Input } from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useEffect, useState, useParams } from "react";
import Header from "../../../Layout/Header";
import './prodcutInputcss.css';
import avatar from '../../../assets/product/profile.png';
import Axios from "axios";

const ProductDeleteForm = ({id}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8002/product/' + id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            console.log('Product deleted successfully.', json)
        }
    }

  return (
    <Box m="20px">
      <Header title="Delete A PRODUCT" subtitle="Update an existing Product" />

      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Delete this Product
        </Button>
      </Box>

    </Box>
  );
};

export default ProductDeleteForm;

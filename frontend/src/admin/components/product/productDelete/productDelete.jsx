import React from "react";
import { Box, Button, useTheme, Modal, style } from "@mui/material";
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div class="DeleteModal">
      <Button onClick={handleOpen}>Delete</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Delete this Product</h2>
        <p id="parent-modal-description">
          Are you sure want to remove this product?
        </p>
        <Button onClick={handleDeleteSubmit}>Remove</Button>
      </Box>
    </Modal></div>
    
  );
};

export default ProductDeleteForm;

import React from "react";
import { Box, Button, TextField, useTheme, Modal, style } from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useEffect, useState, useParams } from "react";
import Header from "../../../Layout/Header";
import './prodcutInputcss.css';
import avatar from '../../../assets/product/profile.png';
import Axios from "axios";

const ProductUpdateForm = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productId , setProductId] = useState('');
  const [name , setName] = useState('');
  const [price , setPrice] = useState('');
  const [quantity , setQuantity] = useState('');
  const [shortDescription , setShortDescription] = useState('');
  const [fullDescription , setFullDescription] = useState('');
  const [category , setCategory] = useState(null);
  const [image, setImage] = useState('');
  
  const { id } = useParams()

  const [product, setProduct] = useState(
    {
      productId: "",
      name: "",
      price: "",
      quantity: "",
      shortDescription: "",
      fullDescription: "",
      category: "",
      image: "",
      __v: 0,
      _id: ""
    })

    useEffect(() => {
      const fetchProduct = async () => {
        const response = await fetch(`/product/${id}`)
        const json = await response.json()
  
        if (response.ok) {
  
          setProduct(
            {
              productId: `${json["productId"]}`,
              name: `${json["name"]}`,
              price: `${json["price"]}`,
              quantity: `${json["quantity"]}`,
              shortDescription: `${json["shortDescription"]}`,
              fullDescription: `${json["fullDescription"]}`,
              category: `${json["category"]}`,
              image: `${json["image"]}`,
              __v: 0,
              _id: `${json["_id"]}`
            })
          
          setProductId(json["productId"])
          setName(json["name"])
          setPrice(json["price"])
          setQuantity(json["quantity"])
          setShortDescription(json["shortDescription"])
          setFullDescription(json["fullDescription"])
          setCategory(json["category"])
          setImage(json["image"])

        } else {
          console.log("failed")
        }  
      } 
      fetchProduct() 
    }, [setProduct])


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8002//product/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        name: name,
        price: price,
        quantity: quantity,
        shortDescription: shortDescription,
        fullDescription: fullDescription,
        category: category,
        image: image,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Product updated successfully.', json)
      window.location.reload();
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  return (
        <Box m="20px">
      <Header title="UPADATE A PRODUCT" subtitle="Update an existing Product" />

          <form onSubmit={handleOpen}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ gridColumn: "span 4" }}
            >
              {/* <InputLabel htmlFor="my-input">Product Name</InputLabel> */}
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Product ID"
                onChange={(e) => setProductId(e.target.value)}
                value={product["productId"]}
                name="productId"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Product Name"
                onChange={(e) => setName(e.target.value)}
                value={product["name"]}
                name="name"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={product["quantity"]}
                name="quantity"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={product["price"]}
                name="price"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Short Description"
                onChange={(e) => setShortDescription(e.target.value)}
                value={product["shortDescription"]}
                name="shortDescription"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Full Description"
                onChange={(e) => setFullDescription(e.target.value)}
                value={product["fullDescription"]}
                name="fullDescription"
                sx={{ gridColumn: "span 4" }}
              />
          
              <label id="demo-simple-select-label">
                Select a Category
              </label>
              <select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setCategory(e.target.value)}
                value={product["category"]}
                name="category"
                sx={{ gridColumn: "span 1" }}
              >
                <option value={null}>Select an Option</option>
                <option value={1}>Category 1</option>
                <option value={2}>Category 2</option>
              </select>
          
              <label>Image</label>

          <label htmlFor="img-upload" className='custom-file-upload'>
            <img src={avatar} alt="" />
          </label>

          <input
          id="img-upload"
          type="file"
          name="myFile"
          lable="Image"
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
          style={{ display: "none" }}
          sx={{ gridColumn: "span 1" }}
         />

{/* <button htmlFor="img-upload" >Upload image</button> */}

            </Box>

                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Update a Product
                  </Button>
                </Box>

                <div class="UpdateModal">
      
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Update this Product</h2>
        <p id="parent-modal-description">
          Are you sure want to update this product?
        </p>
        <Button onClick={handleUpdateSubmit}>Update</Button>
      </Box>
    </Modal></div>

    
          </form>

          

    </Box>
  );
};

export default ProductUpdateForm;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

import { Box, Button, IconButton, TextField, InputLabel, Select, Typography, useTheme, Input } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";
import Header from "../../../Layout/Header";
import './prodcutInputcss.css';
import avatar from '../../../assets/product/profile.png';
import { useNavigate } from "react-router-dom";

const ProductInputForm = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [productId , setProductId] = useState('');
  const [name , setName] = useState('');
  const [price , setPrice] = useState();
  const [quantity , setQuantity] = useState('');
  const [shortDescription , setShortDescription] = useState('');
  const [fullDescription , setFullDescription] = useState('');
  const [category , setCategory] = useState(null);
  const [image, setImage] = useState("");
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const product = {productId, name, price, quantity, shortDescription, fullDescription, category, image};
    console.log(product);

    fetch('http://localhost:8002/product/create', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(product)
    }).then(() => {
      console.log('new product added');
      navigate("/productList");
    })
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  return (
        <Box m="20px">
      <Header title="INSERT A PRODUCT" subtitle="Insert a New Product" />

          <form onSubmit={handleFormSubmit}>
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
                value={productId}
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
                value={name}
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
                value={quantity}
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
                value={price}
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
                value={shortDescription}
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
                value={fullDescription}
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
                value={category}
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

            </Box>

                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Insert a Product
                  </Button>
                </Box>
          </form>

    </Box>
  );
};

export default ProductInputForm;

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

import { Box, Button, TextField, InputLabel, Select, useTheme } from "@mui/material";
import { Formik } from "formik";
// import { tokens } from "../../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Layout/Header";

import React , {useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

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


const ProductInputForm = () => {

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [productId , setProductId] = useState('');
  const [name , setName] = useState('');
  const [price , setPrice] = useState();
  const [quantity , setQuantity] = useState('');
  const [shortDescription , setShortDescription] = useState('');
  const [fullDescription , setFullDescription] = useState('');
  const [category , setCategory] = useState('');
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleFileUpload = async (e) => {
    const file = e.target;
    console.log(file);
    // const base64 = await convertToBase64(file);
    // console.log(base64)
    // setPostImage({ ...postImage, myFile : base64 })
  }

  const handleChange = (e) => {
    // setFileData(e.target.files[0]);
    // setfileName(e.target.files[0].name);
  };


  return (
    <Box m="20px">
      <Header title="INSERT A PRODUCT" subtitle="Insert a New Product" />

          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* <InputLabel htmlFor="my-input">Product Name</InputLabel> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product ID"
                onChange={handleChange}
                value={productId}
                name="productId"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onChange={handleChange}
                value={name}
                name="name"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Quantity"
                onChange={handleChange}
                value={quantity}
                name="quantity"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                value={fullDescription}
                name="fullDescription"
                sx={{ gridColumn: "span 4" }}
              />
          
              <InputLabel id="demo-simple-select-label">
                Select a Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={category}
                name="category"
                sx={{ gridColumn: "span 1" }}
              >
                <option value={null}>Select a Category</option>
                <option value={1}>Category 1</option>
                <option value={2}>Category 2</option>
              </Select>
          
              <InputLabel htmlFor="my-input">Image</InputLabel>
              {/* <FormControl sx={{ gridColumn: "span 1" }}> */}
                <input 
                  id="raised-button-file"
                  type="file"
                  name="image"
                  accept=".jpeg, .png, .jpg"
                  onchange={(e) => handleFileUpload(e)}
                  style={{ display: "none" }}
                  sx={{ gridColumn: "span 1" }}
                />

<button type='submit'>Upload image</button>
              {/* </FormControl> */}

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

const checkoutSchema = yup.object().shape({
  productId: yup.string().required("required"),
  name: yup.string().required("required"),
  quantity: yup.string().required("required"),
  price: yup.string().required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
});

const initialValues = {
  productId: "",
  name: "",
  quantity: "",
  price: "",
  shortDescription: "",
  fullDescription: "",
};

export default ProductInputForm;



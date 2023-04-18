import { Box, Button, TextField, InputLabel, FormControl, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Layout/Header";

import React , {useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

const ProductInputForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [productId , setProductId] = useState('');
  const [name , setName] = useState('');
  const [price , setPrice] = useState();
  const [quantity , setQuantity] = useState('');
  const [shortDescription , setShortDescription] = useState('');
  const [fullDescription , setFullDescription] = useState('');
  const [category , setCategory] = useState('');

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="INSERT A PRODUCT" subtitle="Insert a New Product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productId}
                name="productId"
                error={!!touched.productId && !!errors.productId}
                helperText={touched.productId && errors.productId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                // startAdornment={
                //   <InputAdornment position="start">Rs </InputAdornment>
                // }
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Short Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shortDescription}
                name="shortDescription"
                error={!!touched.shortDescription && !!errors.shortDescription}
                helperText={touched.shortDescription && errors.shortDescription}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Full Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullDescription}
                name="fullDescription"
                error={!!touched.fullDescription && !!errors.fullDescription}
                helperText={touched.fullDescription && errors.fullDescription}
                sx={{ gridColumn: "span 4" }}
              />
          
          <InputLabel id="demo-simple-select-label">
            Select a Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={values.category}
            name="category"
            error={!!touched.category && !!errors.category}
            helperText={touched.category && errors.category}
            sx={{ gridColumn: "span 1" }}
          >
            <option value={null}>Select a Category</option>
            <option value={1}>Category 1</option>
            <option value={2}>Category 2</option>
          </Select>
          
          <InputLabel htmlFor="my-input">Images</InputLabel>
          <FormControl sx={{ gridColumn: "span 1" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="label">
              Upload image
              <input type="file" hidden />
            </Button>
          </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Insert a Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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

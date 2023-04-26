import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./index.css";
import Model from "react-modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../../api/user";
import './prodcutInputcss.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from '../../../assets/product/icon-image.png';


const ProductInputForm = () => {

  const token = localStorage.getItem("token");

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

  const [user, setUser] = useState(''); 
  console.log(user.id);
  const userId = user.id;
  
  //fetch user ID
useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await getUserId(token);
          if (!userData) {
            navigate("/login-register");
          } else {
            await setUser(userData);
          }
        } else {
          navigate("/login-register");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, []);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const product = {productId, name, price, quantity, shortDescription, fullDescription, category, image, userId};
    console.log(product);

    fetch('http://localhost:8002/product/create', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(product)
    }).then(() => {
      console.log('new product added'); 
      toast.success(`New product added successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/productList");
      }, 3000);
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  return (
    <Box>
        <Box m="20px">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              defaultValue,
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
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
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
                <option value={"Suppliments"}>Suppliments</option>
                <option value={"Sports"}>Sports</option>
                <option value={"Bath"}>Bath</option>
                <option value={"Beauty"}>Beauty</option>
                <option value={"Grocery"}>Grocery</option>
                <option value={"Baby"}>Baby</option>
              </select>
          
              <label>Image</label>

          <label htmlFor="img-upload" className='custom-file-upload'>
            <img className="default-img" src={avatar} alt={avatar} />
            {/* <img src={avatar} alt="" /> */}
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
            )}
          </Formik>
        </Box>

    </Box>
  );
}

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


const checkoutSchema = yup.object().shape({
  trackingNumber: yup.string().required("required"),
  serviceName: yup.string().required("required"),
  deliveryDate: yup
    .date()
    .required("required")
    .min(new Date(), "Date cannot be in the past"),
});
const initialValues = {
  trackingNumber: "",
  serviceName: "",
  deliveryDate: "",
  reciptUpload: "",
};

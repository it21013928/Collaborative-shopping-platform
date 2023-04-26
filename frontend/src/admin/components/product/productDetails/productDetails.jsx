import React from "react";
import { Box, Button, TextField, useTheme, Modal, Input } from "@mui/material";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../Layout/Header";
import avatar from '../../../assets/product/profile.png';
import './productDetails.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsPage = () => {

  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const handleDeleteOpen = () => setOpen(true);
  const handleDeleteClose = () => setOpen(false);

  const [productId , setProductId] = useState('');
  const [name , setName] = useState('');
  const [price , setPrice] = useState('');
  const [quantity , setQuantity] = useState('');
  const [shortDescription , setShortDescription] = useState('');
  const [fullDescription , setFullDescription] = useState('');
  const [category , setCategory] = useState(null);
  const [image, setImage] = useState('');

  const { id } = useParams()
  console.log(id)

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
        const response = await fetch(`http://localhost:8002/product/${id}`)
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

    console.log(product);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8002/product/' + id, {
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

    console.log(productId)

    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }

    if (response.ok) {
      console.log('Product updated successfully.', json)

      toast.success(`Product updated successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/productList");
      }, 3000); 
    }
  }

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
        
        toast.success(`Product deleted successfully `, {
          position: "bottom-left",
        });
        setTimeout(() => {
          navigate("/productList");
        }, 3000);        
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
        <Box m="20px">
      <Header title="PRODUCT DETAILS" subtitle="Details of the selected Product"/>

      <form>
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
                sx={{ gridColumn: "span 1" }}
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
            <img className="default-img" src={image} alt="" />
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

            {/* <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" style={{marginLeft:"400px"}} color="secondary" variant="contained">
                    Update the Product
                  </Button>
                </Box> */}

          </form>

          <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" style={{marginReft:"400px", backgroundColor: '#990f02'}} onClick={handleDeleteOpen} variant="contained">
                    Delete the Product
                  </Button>

                  <Button type="submit" style={{marginLeft:"400px"}} onClick={handleUpdateOpen} color="secondary" variant="contained">
                    Update the Product
                  </Button> 
                </Box>
                
                <div class="UpdateModal">
      
    <Modal
      open={openUpdate}
      onClose={handleUpdateClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...styles, width: 400 }} style={{backgroundColor: '#B9BBB6'}}>
        <h2 id="parent-modal-title">Update this Product</h2>
        <p id="parent-modal-description">
          Are you sure want to update this product?
        </p>
        <Button style={{backgroundColor: '#028A0F'}} onClick={handleUpdateSubmit}>Update</Button>
        <Button onClick={handleUpdateClose} color="secondary">Cancel</Button>
      </Box>
    </Modal>
    
    
    
    </div>


    <div class="DeleteModal">
      
      <Modal
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...styles, width: 400}} style={{backgroundColor: '#B9BBB6'}}>
          <h2 id="parent-modal-title">Delete this Product</h2>
          <p id="parent-modal-description">
            Are you sure want to delete this product?
          </p>
          <Button style={{backgroundColor: '#990f02'}} onClick={handleDeleteSubmit}>Delete</Button>
          <Button onClick={handleDeleteClose} color="secondary">Cancel</Button>
        </Box>
      </Modal>
      
      </div>

    </Box>
  );
};

export default ProductDetailsPage;

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
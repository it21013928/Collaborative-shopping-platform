import {
  Box,
  useTheme,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  FilledInput,
  TextField,
  Select,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";

const ProductInputForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Box marginLeft={"20px"}>
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        ></Box>
        {/* methna ghpn */}

        <div id="ProductInputForm">
          <InputLabel htmlFor="my-input">Product Name</InputLabel>
          <FormControl>
            <TextField
              required
              id="outlined-required"
              placeholder="Penadol"
              helperText="*This field is required."
            />
          </FormControl>

          <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
          <FormControl>
            <FilledInput
              id="filled-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs </InputAdornment>
              }
              helperText="*This field is required."
            />
          </FormControl>

          <InputLabel htmlFor="my-input">Quantity</InputLabel>
          <FormControl>
            <TextField
              required
              id="outlined-required"
              placeholder="100"
              helperText="*This field is required."
            />
          </FormControl>

          <InputLabel htmlFor="my-input">Images</InputLabel>
          <FormControl>
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

          <InputLabel htmlFor="my-input">Short Description</InputLabel>
          <FormControl>
            <TextField
              required
              id="outlined-required"
              multiline
              placeholder="Say something about the product"
              helperText="*This field is required."
            />
          </FormControl>

          <InputLabel htmlFor="my-input">Full Description</InputLabel>
          <FormControl>
            <TextField
              multiline
              required
              id="outlined-required"
              placeholder="Provide full description about the product"
              helperText="*This field is required."
            />
          </FormControl>

          <InputLabel htmlFor="my-input">Select tags</InputLabel>
          <FormControl>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="tag1" />
              <FormControlLabel control={<Checkbox />} label="tag1" />
            </FormGroup>
          </FormControl>

          <InputLabel id="demo-simple-select-label">
            Select a Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"defualt"}
            // onChange={handleChange}
          >
            <MenuItem value={"defualt"}>Please select a Category</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        </div>
      </Box>
    </div>
  );
};
export default ProductInputForm;

import { Box, Button, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Layout/Header";
import { registerAccount } from "../../../api/auth";

const Form = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerAccount(data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Box m="20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {errors.name && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Full Name"
            name="name"
            {...register("name", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.email && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            name="email"
            {...register("email", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.phone && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            name="phone"
            {...register("phone", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.city && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="City"
            name="city"
            {...register("city", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.zipCode && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Zip Code"
            name="zipCode"
            {...register("zipCode", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.address && <>This field is required</>}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            name="address"
            {...register("address", { required: true })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.role && <>This field is required</>}
          <InputLabel htmlFor="role" sx={{ gridColumn: "span 2" }}>Role:</InputLabel>
          <Select id="role" {...register("role", { required: true })} sx={{ gridColumn: "span 2" }}>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
          {errors.password?.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.password?.type === "pattern" && (
            <span>
              Password must contain at least 8 characters including lowercase,
              uppercase, and special characters.
            </span>
          )}
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            name="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
            })}
            sx={{ gridColumn: "span 4" }}
          />
          {errors.confirmPassword?.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <span>Passwords do not match</span>
          )}
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;

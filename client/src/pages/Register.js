import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  // handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // from handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "upperCase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            type={"text"}
            required
          />

          <TextField
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            type={"email"}
            required
          />

          <TextField
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            type={"password"}
            required
          />

          <Button
            type="submit"
            sx={{ borderRadius: 2, margin: 2 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 2, margin: 2 }}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Register;

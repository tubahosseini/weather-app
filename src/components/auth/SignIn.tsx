import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //use json server filter to do the search for SURE!!!!
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // stop the page from refreshing !  //use react hook Form instead!
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      const user = users.find(
        (user: any) =>
          user.email === formData.email && user.password === formData.password
      );
      if (user) {
        navigate("/weather");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("There was an error signing in!", error);
    }
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ color: "#fff", fontSize: "30px", fontWeight:'bold', marginY: '32px' }}
      >
        Sign in.
      </Typography>
      <Box component="form" marginTop={1} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#666', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#666', // Focused border color
              },
            },
          }}
          fullWidth
          label="Email Address"
          name="email"
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#666', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#666', // Focused border color
              },
            },
          }}
          fullWidth
          name="password"
          label="Password"
          type="password"
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "#fff", backgroundColor: "#c73659", '&:hover':{backgroundColor:'#c73659d4'} }}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          sx={{ color: "#fff" }}
          onClick={() => navigate("?mode=signup")}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </>
  );
}

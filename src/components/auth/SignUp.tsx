import { useState } from "react";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // do it with local storage !!!
  // do alert with react toast ! already installed.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", formData);
      alert("sign up successfull. Please sign in now :)");
      navigate("?mode=signin");
    } catch (error) {
      console.error("There was an error creating the account!", error);
    }
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          color: "#fff",
          fontSize: "30px",
          fontWeight: "bold",
          marginY: "32px",
        }}
      >
        Create new account.
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#666", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#666", // Focused border color
                  },
                },
              }}
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#666", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#666", // Focused border color
                  },
                },
              }}
              fullWidth
              id="lastName"
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#666", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#666", // Focused border color
                  },
                },
              }}
              fullWidth
              id="email"
              label="Email Address"
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#666", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#666", // Focused border color
                  },
                },
              }}
              fullWidth
              name="password"
              label="Password"
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#c73659",
            "&:hover": { backgroundColor: "#c73659d4" },
          }}
        >
          Create account
        </Button>
        <Button
          sx={{ color: "#fff" }}
          onClick={() => navigate("?mode=signin")}
          fullWidth
        >
          Already have an account? Sign in
        </Button>
      </Box>
    </>
  );
}

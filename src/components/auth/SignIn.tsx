import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in.
      </Typography>
      <Box component="form" marginTop={1}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button onClick={() => navigate("?mode=signup")}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </>
  );
}

import { Paper, Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {mode === "signup" ? (
        <>
          <Grid
            item
            xs={14}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              backgroundColor: "#000000ab",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SignUp />
            </Box>
          </Grid>
          <Grid item>
            <div className="clouds">
              <div className="clouds-1"></div>
              <div className="clouds-2"></div>
              <div className="clouds-3"></div>
            </div>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <div className="clouds">
              <div className="clouds-1"></div>
              <div className="clouds-2"></div>
              <div className="clouds-3"></div>
            </div>
          </Grid>
          <Grid
            item
            xs={14}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              backgroundColor: "#000000ab",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SignIn />
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}

import { Box, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import RecentlySearched from "../recently-searched/RecentlySearched";

export default function Weather() {
  const temperatureData = [28, 26, 27, 23, 30, 25]; // Example temperature data

  const data = {
    labels: ["", "", "", "", "", ""], // Empty labels for no numbers
    datasets: [
      {
        data: temperatureData,
        borderColor: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
      }}
    >
      {/* here is the background */}
      <Box className="clouds-3"></Box>
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <IconButton aria-label="delete">
          <LogoutIcon />
        </IconButton>
      </Box>
      <Grid container>
        <Grid item md={10}>
          <Box sx={{ textAlign: "center", my: 5 }}>
            <Typography variant="h4">Brooklyn, New York, USA</Typography>
            <Typography variant="subtitle1">Friday, January 4</Typography>
          </Box>
          <Typography variant="h1">18°</Typography>
          <Typography variant="h6">Stormy with partly cloudy</Typography>
          <Box sx={{ width: "100%", mt: 4 }}>
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Sunday
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Monday
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Tuesday
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Wednesday
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Thursday
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" marginTop={20}>
                    Friday
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ width: "99.9%", mt: 4, height: "90px" }}>
              <Line data={data} options={options} />
            </Box>
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    28°
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    26°
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    27°
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    23°
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    30°
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontSize={30}>
                    25°
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Grid container direction='column' alignItems='center' sx={{ height: "100vh", color:'black', padding:'16px', gap:'16px' }}>
            <Typography color='white'>Recently searched :</Typography>
            <RecentlySearched/>
            <RecentlySearched/>
            <RecentlySearched/>
            <RecentlySearched/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

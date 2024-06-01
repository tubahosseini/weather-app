import { Box, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import RecentlySearched from "../recently-searched/RecentlySearched";
import { useNavigate } from "react-router-dom";

export default function Weather() {
  const navigate = useNavigate();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
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
      <Box className="clouds-3"></Box>
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <IconButton aria-label="logout" onClick={() => navigate("/")}>
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
              {daysOfWeek.map((day) => (
                <Grid item key={day}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" marginTop={20}>
                      {day}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ width: "100%", mt: 4, height: "90px" }}>
              <Line data={data} options={options} />
            </Box>
            <Grid container justifyContent="space-evenly">
              {temperatureData.map((temp) => (
                <Grid item key={temp}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontSize={30}>
                      {temp}°
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{
              height: "100vh",
              color: "black",
              padding: "16px",
              gap: "16px",
            }}
          >
            <Typography color="white">Recently searched :</Typography>
            <RecentlySearched />
            <RecentlySearched />
            <RecentlySearched />
            <RecentlySearched />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

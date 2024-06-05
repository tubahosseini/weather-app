import { useState } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
// import RecentlySearched from "../recently-searched/RecentlySearched";

export default function Weather() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [description, setDescription] = useState("");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const temperatureData = [28, 26, 27, 23, 30, 25]; // Example temperature data

  // Showing the date
  function getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [weekday, monthDay] = formattedDate.split(", ");
    return `${weekday}, ${monthDay.split(" ")[0]} ${monthDay.split(" ")[1]}`;
  }

  // Showing the graph
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

  // Function to fetch weather data
  const fetchWeatherData = async (cityName: any) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d17ef473ffd9b120e464006f224abc14&units=metric`
      );
      const data = await response.json();
      console.log(data);
      if (data.main) {
        setTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setCity(`${data.name}, ${data.sys.country}`);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
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
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <TextField
          onChange={(e) => fetchWeatherData(e.target.value)}
          placeholder="Enter city name"
        />
      </Box>
      <Grid container>
        <Grid item md={12}>
          <Box sx={{ textAlign: "left", mt: 10, mb: 6, ml: 4 }}>
            <Typography variant="h4">{city}</Typography>
            <Typography variant="subtitle1">{getFormattedDate()}</Typography>
          </Box>
          <Typography variant="h1">{temp}°</Typography>
          <Typography variant="h6">{description}</Typography>
          <Box sx={{ width: "100%", mt: 2 }}>
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
        {/* <Grid item md={2}>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{
              height: "80vh",
              backgroundColor: "pink",
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
        </Grid> */}
      </Grid>
    </Box>
  );
}

import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Logout, Place } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { debounce } from "chart.js/helpers";
import RecentlySearched from "../recently-searched/RecentlySearched";
import "chart.js/auto";

interface SearchData {
  temperature: number;
  location: string;
  description: string;
  icon: string;
}

interface City {
  name: string;
  country: string;
}

export default function Weather() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState<number | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [recentSearches, setRecentSearches] = useState<SearchData[]>([]);
  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const temperatureData = [27, 28, 26, 27, 23, 30, 25]; // Example temperature data

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    // Load recent searches from local storage or any persistent storage
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    // Store recent searches in local storage
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Fetch city suggestions
  const fetchCitySuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
        {
          headers: {
            "x-rapidapi-key":
              "e216deee7bmshdbf92d293533befp1f3b92jsn9b600800bcac",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      const cities = data.data.map((city: any) => ({
        name: city.city,
        country: city.country,
      }));
      setCityOptions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions: ", error);
    }
  };

  const debounceFetchCitySuggestions = useCallback(
    debounce((value: string) => {
      if (value) {
        fetchCitySuggestions(value);
      }
    }, 200),
    []
  );

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
  // graph informations
  const data = {
    labels: ["", "", "", "", "", "", ""],
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

  const fetchWeatherData = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d17ef473ffd9b120e464006f224abc14&units=metric`
      );
      const data = await response.json();
      console.log(data);
      if (data.main) {
        const newSearch = {
          temperature: data.main.temp,
          location: `${data.name}, ${data.sys.country}`,
          description: data.weather[0].description,
          icon: data.weather[0].icon, // Add icon data
        };
        setRecentSearches((prev) => [newSearch, ...prev.slice(0, 3)]);
        setTemp(data.main.temp);
        setTempMin(data.main.temp_min);
        setTempMax(data.main.temp_max);
        setDescription(data.weather[0].description);
        setCity(`${data.name}, ${data.sys.country}`);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
  };

  const debounceFetchWeatherData = useCallback(
    debounce(fetchWeatherData, 300),
    []
  );

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
      <Box sx={{ position: "absolute", top: 20, right: 1 }}>
        <IconButton aria-label="logout" onClick={() => navigate("/")}>
          <Logout style={{ color: "white" }} />
        </IconButton>
      </Box>
      <Box sx={{ position: "absolute", top: 16, right: 46, width: "300px" }}>
        <Autocomplete
          freeSolo
          options={cityOptions.map(
            (option) => `${option.name}, ${option.country}`
          )}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            console.log(event);
            debounceFetchCitySuggestions(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ style: { color: "#fff" } }}
              placeholder="Enter city name"
              sx={{
                "& fieldset": {
                  borderColor: "#666",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#666",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#666",
                  },
                  "& input": {
                    color: "white",
                  },
                },
              }}
            />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              debounceFetchWeatherData(newValue);
              console.log(event);
            }
          }}
        />
      </Box>
      <Grid container>
        <Grid item md={2}>
          <Typography mb={1} color="white">
            Recently searched :
          </Typography>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{
              height: "92vh",
              overflowY: "auto",
              flexWrap: "nowrap",
              color: "black",
              padding: "16px",
              gap: "16px",
            }}
          >
            {recentSearches.map((search, index) => (
              <RecentlySearched
                key={index}
                temperature={search.temperature}
                location={search.location}
                description={search.description}
                icon={`https://openweathermap.org/img/w/${search.icon}.png`}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item md={10}>
          <Box
            sx={{
              textAlign: "left",
              mt: 10,
              mb: 6,
              ml: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              <Place
                style={{
                  color: "white",
                  marginRight: "16px",
                  fontSize: "30px",
                }}
              />
              {city}
            </Typography>
            <Typography px={4}>{`(  ${getFormattedDate()}  )`}</Typography>
          </Box>
          <Box>
            <Box display="flex">
              <Typography
                justifyContent="flex-start"
                pl={4}
                mb={8}
                variant="h2"
              >
                {`${temp}°`}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                pl={8}
                mt="8px"
                gap="6px"
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    backgroundColor: "black",
                    py: "3px",
                    px: "30px",
                    borderRadius: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item sx={{ alignSelf: "flex-start" }}>
                    H
                  </Grid>
                  <Grid item sx={{ alignSelf: "flex-end" }}>
                    {`${tempMax}°`}
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    backgroundColor: "black",
                    py: "3px",
                    px: "30px",
                    borderRadius: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item sx={{ alignSelf: "flex-start" }}>
                    L
                  </Grid>
                  <Grid item sx={{ alignSelf: "flex-end" }}>
                    {`${tempMin}°`}
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Typography
              display="flex"
              justifyContent="flex-start"
              pl={4}
              variant="h2"
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ width: "100%", mt: 2, position: "fixed", bottom: 15 }}>
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
                      {`${temp}°`}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

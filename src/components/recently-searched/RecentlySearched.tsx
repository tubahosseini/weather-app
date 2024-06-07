// import { Thunderstorm } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

interface RecentlySearchedProps {
  temperature: number;
  location: string;
  description: string;
  icon: string;
}

export default function RecentlySearched({
  temperature,
  location,
  description,
  icon,
}: RecentlySearchedProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffffab",
        padding: "16px",
        width: "200px",
        height: "150px",
        borderRadius: "16px",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <img src={icon} />
        </Grid>
        <Grid item fontSize={30}>
          {`${temperature}°`}
        </Grid>
      </Grid>
      <Typography marginTop="5px" fontSize={20}>
        {location}
      </Typography>
      <Typography marginTop="8px">{description}</Typography>
    </Box>
  );
}

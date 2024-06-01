import { Thunderstorm } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export default function RecentlySearched() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffffab",
        padding: "16px",
        width: "200px",
        height: "150px",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Thunderstorm />
        </Grid>
        <Grid item fontSize={30}>
          25°
        </Grid>
      </Grid>
      <Typography marginTop="16px" fontSize={20}>
        Liverpool, UK
      </Typography>
      <Typography marginTop="12px">Partly cloudy</Typography>
    </Box>
  );
}

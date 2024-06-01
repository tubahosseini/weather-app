import { Paper, Box, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {mode === "signup" ? (
        <>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            order={{ xs: 2, sm: 2, md: 2 }} // ensures this item comes second
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
          <Grid
            item
            xs={12}
            sm={4}
            md={7}
            order={{ xs: 1, sm: 1, md: 1 }} // ensures this item comes first
          >
            <div className="clouds">
              <div className="clouds-1"></div>
              <div className="clouds-2"></div>
              <div className="clouds-3"></div>
            </div>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={4}
            md={7}
            order={{ xs: 2, sm: 2, md: 2 }} // ensures this item comes first
          >
            <div className="clouds">
              <div className="clouds-1"></div>
              <div className="clouds-2"></div>
              <div className="clouds-3"></div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            order={{ xs: 1, sm: 1, md: 1 }} // ensures this item comes second
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

// import { Paper, Box, Grid } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";

// export default function Auth() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const mode = searchParams.get("mode");

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       {mode === "signup" ? (
//         <>
//           <Grid
//             item
//             xs={12}
//             sm={8}
//             md={5}
//             order={{ xs: 2, sm: 2, md: 2 }} // ensures this item comes second
//             component={Paper}
//             elevation={6}
//             square
//             sx={{
//               backgroundColor: "#000000ab",
//               color: "#fff",
//             }}
//           >
//             <Box
//               sx={{
//                 my: 8,
//                 mx: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <SignUp />
//             </Box>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={4}
//             md={7}
//             order={{ xs: 1, sm: 1, md: 1 }} // ensures this item comes first
//           >
//             <div className="clouds">
//               <div className="clouds-1"></div>
//               <div className="clouds-2"></div>
//               <div className="clouds-3"></div>
//             </div>
//           </Grid>
//         </>
//       ) : (
//         <>
//           <Grid
//             item
//             xs={12}
//             sm={4}
//             md={7}
//             order={{ xs: 2, sm: 2, md: 2 }} // ensures this item comes first
//           >
//             <div className="clouds">
//               <div className="clouds-1"></div>
//               <div className="clouds-2"></div>
//               <div className="clouds-3"></div>
//             </div>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={8}
//             md={5}
//             order={{ xs: 1, sm: 1, md: 1 }} // ensures this item comes second
//             component={Paper}
//             elevation={6}
//             square
//             sx={{
//               backgroundColor: "#000000ab",
//               color: "#fff",
//             }}
//           >
//             <Box
//               sx={{
//                 my: 8,
//                 mx: 4,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <SignIn />
//             </Box>
//           </Grid>
//         </>
//       )}
//     </Grid>
//   );
// }

import React from "react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        width: `calc(100% - 250px)`,
        ml: `250px`,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Box
            sx={{
              bgcolor: "white",
              color: "#0026ff",
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            مصرف الراجحي
          </Box> */}
          {/* <Typography variant="h3" fontWeight="bold">
            Crux
          </Typography> */}
        </Box>

        {/* <IconButton>
          <Box
            sx={{
              bgcolor: "#00bcd4",
              color: "white",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            AV
          </Box>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

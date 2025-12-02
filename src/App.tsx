import React from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AnalyzeAnswers from "./pages/AnalyzeAnswers";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f6f8",
          p: 3,
          width: "100%",
          // ml: "20px",
          mt: "60px",
        }}
      >
        <Toolbar />
        <AnalyzeAnswers />
      </Box>
    </Box>
  );
};

export default App;

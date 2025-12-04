import React, { useState } from "react";
import CruxLogo from "../images/Crux.png";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";

const drawerWidth = 250;

const Sidebar: React.FC = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openSurveys, setOpenSurveys] = useState(false);
  const [openReports, setOpenReports] = useState(false);


  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  const handleSurveysClick = () => {
    setOpenSurveys(!openSurveys);
  };

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f7f9fb",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      {/* Sidebar Top Logo */}
      <Toolbar
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          bgcolor: "white",
          height: "70px",
          
        }}
      >
        <Box
          component="img"
          src={CruxLogo}
          alt="Crux Logo"
          sx={{
            height: 40,
            width: "20",
            objectFit: "contain",
          }}
        />
      </Toolbar>

      {/* Sidebar Menu */}
      <List>
        <ListItemButton onClick={handleDashboardClick}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
              {openDashboard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

         <Collapse in={openDashboard} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="CX Ratings" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleSurveysClick}>
          <ListItemIcon>
            <DescriptionIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Surveys" />
              {openSurveys ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

         <Collapse in={openSurveys} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Create Survey" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Manage Surveys" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleReportsClick}>
          <ListItemIcon>
            <AssessmentIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Individual Responses" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Analyze Answers" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;

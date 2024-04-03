import React from "react";
import { Drawer, AppBar, Toolbar, Box, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "../SideBar/FacultySidebar";
import AccountPopover from "./AccountPopover";

const FacultyNavbar = () => {
  const drawerWidth = 280;
  return (
    <>
      <AppBar
        postion='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          backgroundColor: "rgb(249, 250, 251)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <SearchIcon />
          </IconButton>

          <Box>
            
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountPopover/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <nav
        style={{
          width: `${drawerWidth}px`,
        }}
      >
        <Drawer
          variant='permanent'
          open
          PaperProps={{
            sx: {
              backgroundColor: "rgb(249, 250, 251)",
              width: `${drawerWidth}px`,
              overflow: "auto",

              height: "100%",
            },
          }}
        >
          <SideBar />
        </Drawer>
      </nav>
    </>
  );
};

export default FacultyNavbar;

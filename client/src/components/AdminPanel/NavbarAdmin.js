import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "../../images/logo.png";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SummarizeIcon from "@mui/icons-material/Summarize";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavbarSectionClose = (event) => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
    window.location.reload();
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {/* Dashboard */}
        <Link
          to="/admin-dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <DashboardIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        <Divider />

        {/* User Details Section */}
        <Link
          to="/user-details"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <PermIdentityIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="User Details" />
          </ListItemButton>
        </Link>

        <Divider />

        {/* Prediction Report Section */}
        <Link
          to="/prediction-report"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <SummarizeIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Prediction Report" />
          </ListItemButton>
        </Link>

        <Divider />
        {/* 3d models */}
        <Link
          to="/edit-3d-models"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ViewInArIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Edit 3d Models" />
          </ListItemButton>
        </Link>

        <Divider />
        {/* sqft cost */}
        <Link
          to="/edit-sqft-cost"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ViewInArIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Edit Sqft Cost" />
          </ListItemButton>
        </Link>

        <Divider />
        {/* model videos */}
        <Link
          to="/edit-model-videos"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <LibraryAddIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Edit Model Videos" />
          </ListItemButton>
        </Link>

        <Divider />
        {/* post report Section */}
        <Link
          to="/post-report"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ErrorOutlineIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Post Moderation" />
          </ListItemButton>
        </Link>

        <Divider />

        {/* User feedback Section */}
        <Link
          to="/user-feedbacks"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <FeedbackIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="User Feedback" />
          </ListItemButton>
        </Link>

        <Divider />

        {/* User complaint Section */}
        <Link
          to="/user-complaints"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ErrorOutlineIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="User Complaint" />
          </ListItemButton>
        </Link>

        <Divider />

        {/* Edit Profile Section */}
        <Link
          to="/edit-profile"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ManageAccountsIcon
              style={{ opacity: "0.6", marginRight: "8px" }}
            />
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgba(59, 177, 155, 0.9)" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img
                src={logo}
                alt="logo_img"
                style={{ width: "80px", height: "80px", marginRight: "10px" }}
              />
            </Link>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "30px" }}
            >
              FloodSafe Hub
            </Typography>

            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "8px 15px",
                borderRadius: "20px",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Sidenav */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          // when i will add other expandable sections, i will add them here as well, so far we only have agriplanner
          // and crop recommendation
          setDrawerOpen(false);
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}

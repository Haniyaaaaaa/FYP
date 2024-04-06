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
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CampaignIcon from "@mui/icons-material/Campaign";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";

export default function Navbar() {
  const navigate = useNavigate();
  const [awarnessCampaignOpen, setAwarnessCampaignOpen] = useState(false);
  const [open3d, setOpen3d] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [renewalAssistOpen, setRenewalAssistOpen] = useState(false);

  const handleAwarnessCampaignClick = (event) => {
    event.stopPropagation();
    setAwarnessCampaignOpen(!awarnessCampaignOpen);
  };
  const handleOpen3d = (event) => {
    event.stopPropagation();
    setOpen3d(!open3d);
  };

  const handleComplaintClick = (event) => {
    event.stopPropagation();
    setComplaintOpen(!complaintOpen);
  };

  const handleRenewalAssistClick = (event) => {
    event.stopPropagation();
    setRenewalAssistOpen(!renewalAssistOpen);
  };

  const handleNavbarSectionClose = (event) => {
    setDrawerOpen(false);
    setAwarnessCampaignOpen(false);
    setComplaintOpen(false);
    setRenewalAssistOpen(false);
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
        {/* Home Section */}
        <Link
          to="/home-normalvictim"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <HomeIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>

        <Divider />
        {/* Flood connect */}
        <Link
          to="/home-flood-connect"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <ListItemText primary="Flood Connect" />
          </ListItemButton>
        </Link>
        {/* Flood Awarness Campaign */}
        <ListItemButton onClick={handleAwarnessCampaignClick}>
          <CampaignIcon style={{ opacity: "0.6", marginRight: "8px" }} />
          <ListItemText primary="Flood Awarness Campaign" />
          <ExpandMoreIcon />
        </ListItemButton>
        <Collapse in={awarnessCampaignOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Documentaries on Flood History */}
            <Link
              to="/documentaries"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="Documentaries on Flood History" />
              </ListItemButton>
            </Link>

            {/* E-Learning Courses for Flood Preparedness */}
            <Link
              to="/e-Learning-Courses"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="E-Learning Courses for Flood Preparedness" />
              </ListItemButton>
            </Link>

            {/* Research Papers on Flood Precautions */}
            <Link
              to="/research-papers"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="Research Papers on Flood Precautions" />
              </ListItemButton>
            </Link>

            {/* Resources on Post Flood Rehabilitation */}
            <Link
              to="/resources"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="Resources on Post Flood Rehabilitation" />
              </ListItemButton>
            </Link>

            {/* Quizzes */}
            <Link
              to="/play-quiz"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="Take Quiz" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        {/* 3d Models Section */}
        <ListItemButton onClick={handleOpen3d}>
          <ViewInArIcon style={{ opacity: "0.6", marginRight: "8px" }} />
          <ListItemText primary="3d Models" />
          <ExpandMoreIcon />
        </ListItemButton>

        <Collapse in={open3d} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Documentaries on Flood History */}
            <Link
              to="/3d-models"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="View models" />
              </ListItemButton>
            </Link>
            <Link
              to="/model-videos"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton>
                <ListItemText primary="Documentaries on Flood History" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Divider />

        {/* Flood Recovery and Renewal Assist Section */}
        <ListItemButton onClick={handleRenewalAssistClick}>
          <SafetyCheckIcon style={{ opacity: "0.6", marginRight: "8px" }} />
          <ListItemText primary="Flood Recovery and Renewal Assist" />
          <ExpandMoreIcon />
        </ListItemButton>
        <Collapse in={renewalAssistOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/pre-flood-checklist"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Pre-Flood Recovery Checklist" />
              </ListItemButton>
            </Link>
            <Link
              to="/post-flood-checklist"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Post-Flood Recovery Checklist" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Divider />

        {/* feedback Section */}
        <Link
          to="/feedback"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleNavbarSectionClose}
        >
          <ListItemButton>
            <RateReviewIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Give Feedback" />
          </ListItemButton>
        </Link>

        <Divider />

        {/* Complaint Section */}
        <ListItemButton onClick={handleComplaintClick}>
          <ErrorOutlineIcon style={{ opacity: "0.6", marginRight: "8px" }} />
          <ListItemText primary="Complaint" />
          <ExpandMoreIcon />
        </ListItemButton>
        <Collapse in={complaintOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/complaint"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Make Complaint" />
              </ListItemButton>
            </Link>
            <Link
              to="/view-complaint"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleNavbarSectionClose}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="View Complaint" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

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

        <Divider />
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
          setAwarnessCampaignOpen(false);
          setComplaintOpen(false);
          setRenewalAssistOpen(false);
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "../images/logo.png";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [agriPlannerOpen, setAgriPlannerOpen] = useState(false);
  const [cropRecommendationOpen, setCropRecommendationOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);

  const handleAgriPlannerClick = (event) => {
    event.stopPropagation();
    setAgriPlannerOpen(!agriPlannerOpen);
    setCropRecommendationOpen(false);

  };

  const handleCropRecommendationClick = (event) => {
    event.stopPropagation();
    setCropRecommendationOpen(!cropRecommendationOpen);
  };

  const handleComplaintClick = (event) => {
    event.stopPropagation();
    setComplaintOpen(!complaintOpen);
  };


  const handleNavbarSectionClose = (event) => {
    setDrawerOpen(false);
    setAgriPlannerOpen(false);
    setCropRecommendationOpen(false);
    setComplaintOpen(false);

  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/login');
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
        <Link to="/home-farmer" style={{ textDecoration: 'none' }} onClick={handleNavbarSectionClose}>
          <ListItemButton>
            <HomeIcon style={{ opacity: "0.6", marginRight: "8px" }} />
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Divider />

        {/* Agriculture Planner Section */}
        <ListItemButton onClick={handleAgriPlannerClick}>
          <AgricultureIcon style={{ opacity: "0.6", marginRight: "8px" }} />
          <ListItemText primary="Agriculture Planner" />
          <ExpandMoreIcon />
        </ListItemButton>
        <Collapse in={agriPlannerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {/* Flood protection guide */}
            <Link to="/flood-protection-guide" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
              <ListItemButton>
                <ListItemText primary="Flood Protection Guide" />
              </ListItemButton>
            </Link>

            {/* Crop Recommendation Section */}
            <ListItemButton onClick={handleCropRecommendationClick}>
              <ListItemText primary="Crop Recommendation" />
              <ExpandMoreIcon />
            </ListItemButton>
            <Collapse in={cropRecommendationOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <Link to="/location-based-prediction" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Location-Based" />
                  </ListItemButton>
                </Link>
                <Link to="/parameter-based-prediction" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Parameter-Based" />
                  </ListItemButton>
                </Link>

              </List>
            </Collapse>

            {/* Videos */}
            <Link to="/farming-videos" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
              <ListItemButton>
                <ListItemText primary="Videos" />
              </ListItemButton>
            </Link>

            {/* Flood protection guide */}
            <Link to="/faqs" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
              <ListItemButton>
                <ListItemText primary="FAQs" />
              </ListItemButton>
            </Link>

          </List>
        </Collapse>

        <Divider />

        {/* feedback Section */}
        <Link to="/feedback" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
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

            <Link to="/complaint" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Make Complaint" />
              </ListItemButton>
            </Link>
            <Link to="/view-complaint" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="View Complaint" />
              </ListItemButton>
            </Link>

          </List>
        </Collapse>

        <Divider />

        {/* Edit Profile Section */}
        <Link to="/edit-profile" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleNavbarSectionClose}>
          <ListItemButton>
            <ManageAccountsIcon style={{ opacity: "0.6", marginRight: "8px" }} />
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
        <AppBar position="static" sx={{ backgroundColor: 'rgba(59, 177, 155, 0.9)' }}>
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
              <img src={logo} alt="logo_img" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
            </Link>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "30px" }}>
              FloodSafe Hub
            </Typography>

            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "white", color: "black", padding: "8px 15px", borderRadius: "20px" }}
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
          setAgriPlannerOpen(false);
          setComplaintOpen(false);
        }}
      >
        {list()}
      </Drawer>

    </div>
  );
}
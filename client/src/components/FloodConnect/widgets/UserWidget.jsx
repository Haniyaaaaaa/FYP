import { Box, Typography, Divider, colors } from "@mui/material";
import UserImage from "../components/UserImage";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const uid = useSelector((state) => state.uid);
  const dark = "#000000";
  const medium = "#000000";
  const main = "#000000";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/get-users/${uid}`
      );
      const data = await response.json();
      setUser(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: colors.grey,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;

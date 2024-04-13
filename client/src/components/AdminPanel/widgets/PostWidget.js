import React from "react";
import { Typography, Divider } from "@mui/material";
import Friend from "./Friend";
import WidgetWrapper from "../../FloodConnect/components/WidgetWrapper";

const PostWidget = ({ postUserId, name, description }) => {
  return (
    <WidgetWrapper m="2rem 0">
      <Friend friendId={postUserId} name={name} />

      <Typography variant="body1" sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      <Divider />
    </WidgetWrapper>
  );
};

export default PostWidget;

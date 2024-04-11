import { Box, colors, useTheme, Typography } from "@mui/material";
import FlexBetween from "../../FloodConnect/components/FlexBetween";
import UserImage from "../../FloodConnect/components/UserImage";

const Friend = ({ name, subtitle, userPicturePath }) => {
  const { palette } = useTheme();
  const main = colors.grey;
  const medium = colors.blueGrey;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Typography color={main} variant="h5" fontWeight="500">
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;

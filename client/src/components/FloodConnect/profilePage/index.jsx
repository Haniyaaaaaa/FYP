import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {
  const userId = useSelector((state) => state.uid);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (!userId) return null;

  return (
    <Box>
      <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="center">
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          className="flex justify-center mr-20"
        >
          <UserWidget userId={userId} picturePath={"/a.png"} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={"/a.png"} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

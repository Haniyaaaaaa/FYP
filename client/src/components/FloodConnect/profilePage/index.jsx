import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {

  const userId = useSelector((state) => state.uid);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (!userId) return null;

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={"/b.png"} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={"/b.png"} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

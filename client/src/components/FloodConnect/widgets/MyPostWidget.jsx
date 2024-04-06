import { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  colors,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const uid = useSelector((state) => state.uid);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = colors.grey[500];
  const medium = colors.lightBlue;

  const handleDialogClose = (action) => {
    setOpenDialog(false);
    if (action === "discard") {
      setPost("");
      setImage(null);
    }
  };

  const handlePostDialogOpen = () => {
    setOpenDialog(true);
  };

  const handlePost = async () => {
    const postData = {
      userId: uid,
      description: post,
    };

    setOpenDialog(false);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/save-post`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const posts = response.data;
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <WidgetWrapper>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to post this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDialogClose("discard")}
            sx={{
              color: palette.background.alt,
              backgroundColor: "#3bb19b",
              borderRadius: "3rem",
              "&:hover": {
                cursor: "pointer",
                color: "black",
              },
            }}
          >
            Discard
          </Button>
          <Button
            onClick={handlePost}
            autoFocus
            sx={{
              color: palette.background.alt,
              backgroundColor: "#3bb19b",
              borderRadius: "3rem",
              "&:hover": {
                cursor: "pointer",
                color: "black",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <FlexBetween gap="1.5rem">
        {picturePath ? (
          <UserImage image={picturePath} />
        ) : (
          <AccountCircleIcon />
        )}
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: colors.grey[100],
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed #3bb19b`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <></>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePostDialogOpen}
          sx={{
            color: palette.background.alt,
            backgroundColor: "#3bb19b",
            borderRadius: "3rem",
            "&:hover": {
              cursor: "pointer",
              color: "black",
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;

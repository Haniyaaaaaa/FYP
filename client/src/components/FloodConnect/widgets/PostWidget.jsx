import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box, Divider, IconButton, Typography, useTheme, Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,

}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isComments, setIsComments] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  
  const dispatch = useDispatch();
  const twitterShareUrl = (text, url) => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  };

  const whatsappShareUrl = (text, url) => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`;
  };
  const handleShareOnTwitter = () => {
    const text = `Check out this post by ${name}: ${description}`;
    const url = `http://localhost:3001/posts/${postId}`; // Replace with actual post URL
    window.open(twitterShareUrl(text, url), '_blank');
  };

  const handleShareOnWhatsApp = () => {
    const text = `Check out this post by ${name}: ${description}`;
    const url = `http://localhost:3001/posts/${postId}`; // Replace with actual post URL
    window.open(whatsappShareUrl(text, url), '_blank');
  };
  const handleOpenShareDialog = () => {
    setOpenShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };


  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [newComment, setNewComment] = useState("");
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

   const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentDialogOpen = () => {
    setOpenCommentDialog(true);
  };

  const handleCommentDialogClose = () => {
    setOpenCommentDialog(false);
  };

  const submitComment = async () => {
    handleCommentDialogClose();
    if (!newComment.trim()) return;
    
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

    setNewComment("");
  };

  const discardComment = () => {
    setNewComment("");
    handleCommentDialogClose();
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful deletion, e.g., update state or redirect
        console.log('Post deleted successfully');
        // Close the confirmation dialog
        setOpenDeleteDialog(false);
        // Dispatch an action to update your app state if necessary
        // dispatch(removePost({ postId }));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditPost = () => {
    setIsEditing(true);
    handleClose();
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleUpdatePost = async () => {
    console.log("Updating post"); // For debugging
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedDescription }),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setIsEditing(false);
      } else {
        console.error("Failed to update post: ", response.status);
      }
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };
  
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {postUserId === loggedInUserId && (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="post-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="post-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEditPost}>Edit</MenuItem>
            <MenuItem onClick={() => setOpenDeleteDialog(true)}>Delete</MenuItem>
          </Menu>
        </div>
      )}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: '#3bb19b' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.25rem">
          <IconButton onClick={handleOpenShareDialog}>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>

      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${postId}-comment-${i}`}>
              <Divider />
              <Typography sx={{ color: '#3bb19b', m: "0.5rem 0", pl: "1rem" }}>
                {`${comment.username}: ${comment.comment}`}
              </Typography>
            </Box>
          ))}
          <Divider />
          <Box p="1rem">
          <FlexBetween gap="0.5rem" alignItems="center">
          <TextField
            fullWidth
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleNewCommentChange}
            variant="outlined"
            size="small"
          />
          <Button onClick={handleCommentDialogOpen} sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>
            Post
          </Button>
          </FlexBetween>
        </Box>
        </Box>
      )}
      <Dialog open={openShareDialog} onClose={handleCloseShareDialog}>
        <DialogTitle>Share Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select where you want to share this post.
          </DialogContentText>
          <Button onClick={handleShareOnTwitter} fullWidth sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>
            Share on Twitter
          </Button>
          <Button onClick={handleShareOnWhatsApp} fullWidth
            sx={{
              color: palette.background.alt,
              backgroundColor: '#3bb19b',
              borderRadius: "3rem",
              '&:hover': {
                cursor: 'pointer',
                color: 'black',
              },
              marginTop: "1rem",
            }}>
            Share on WhatsApp
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog} sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCommentDialog} onClose={handleCommentDialogClose}>
        <DialogTitle>Confirm Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={discardComment}sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>Discard</Button>
          <Button onClick={submitComment} autoFocus sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {isEditing && (
                <Dialog open={isEditing} onClose={handleEditClose}>
                  <DialogTitle>Edit Post</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      label="Post Description"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose} 
                    sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>Cancel</Button>
                    <Button onClick={handleUpdatePost}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: '#3bb19b',
                      borderRadius: "3rem",
                      '&:hover': {
                        cursor: 'pointer',
                        color: 'black',
                      },
                    }}>Update</Button>
                  </DialogActions>
                </Dialog>
              )}
             {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}
          onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeletePost} sx={{
            color: palette.background.alt,
            backgroundColor: '#3bb19b',
            borderRadius: "3rem",
            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;

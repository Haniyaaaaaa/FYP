import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const [post, setPost] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/api/posts");
    const data = await response.json();
    console.log(data)
    setPost(data)
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/api/posts/${userId}/posts`,
     
    );
    const data = await response.json();
    console.log("post data");
    console.log(data);
    setPost(data)
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {post.map(
        ({
          _id,
          userId,
          username,
          userPicturePath,
          description,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={username}
            userPicturePath={userPicturePath}
            description={description}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

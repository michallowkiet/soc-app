import classes from "./Post.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DeletePostModal from "../../components/post/DeletePostModal";
import axios from "axios";

function Post({ post, deletePost }) {
  const { user } = useOutletContext();
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const liked = post.likes.filter((like) => like.id === user.id);
  const [doesUserLiked, setDoesUserLiked] = useState(
    liked.length ? true : false
  );

  let errorMsg;

  const showModal = () => {
    setDeleteModalDisplay(!deleteModalDisplay);
    document.body.classList.toggle("open");
  };

  const likePost = async (id, isLiked) => {
    try {
      await axios.post(
        `http://akademia108.pl/api/social-app/post/${
          isLiked ? "dislike" : "like"
        }`,
        {
          post_id: id,
        }
      );
    } catch (error) {
      errorMsg = <p>Something went wrong</p>;
    }
  };

  const deleteHandler = () => {
    showModal();
  };

  const likeHandler = () => {
    likePost(post.id, doesUserLiked);
    setDoesUserLiked((prevState) => !prevState);
    setLikesCount((prevState) => {
      return doesUserLiked ? prevState - 1 : prevState + 1;
    });
  };

  let deleteButton;
  if (user && user.id === post.user.id) {
    deleteButton = <button onClick={deleteHandler}>Delete post</button>;
  }

  const { username, avatar_url: avatarUrl } = post.user;
  return (
    <div className={classes.post}>
      {deleteModalDisplay && (
        <DeletePostModal
          postId={post.id}
          showModal={showModal}
          deletePost={deletePost}
        />
      )}
      <div className={classes.userContainer}>
        <img src={avatarUrl} alt="User Avatar" />
        <p className={classes.user}>{username}</p>
        <p className={classes.date}>
          {new Date(post.created_at).toLocaleString(navigator.language)}
        </p>
      </div>
      <p className={classes.postContent}>{post.content}</p>
      <div className={classes.actions}>
        {deleteButton}
        <button onClick={likeHandler}>
          {doesUserLiked ? "Dislike" : "Like"}
        </button>
        <div className={classes.likes}>
          <FavoriteOutlinedIcon />
          {likesCount}
        </div>
      </div>
      {errorMsg}
    </div>
  );
}

export default Post;

import classes from "./Post.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DeletePostModal from "../../components/post/DeletePostModal";
import { likeDislike } from "../../utils/api";

function Post({ post, deletePost, follows, unFollow }) {
  const { user } = useOutletContext();
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const liked = user ? post.likes.filter((like) => like.id === user.id) : null;
  const [doesUserLiked, setDoesUserLiked] = useState(
    liked?.length ? true : false
  );

  let errorMsg;
  let deleteButton;
  let unfollowButton;

  const showModal = () => {
    setDeleteModalDisplay((prevState) => {
      return !prevState;
    });
    document.body.classList.toggle("open");
  };

  const likePost = async (id, isLiked) => {
    const data = await likeDislike(isLiked, id);

    if (data) {
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

  const unFollowHandler = () => {
    unFollow(post.user.id);
  };

  if (user && user.id === post.user.id) {
    deleteButton = <button onClick={deleteHandler}>Delete post</button>;
  }

  const filteredFollows = follows.filter(
    (follow) => follow.id === post.user.id
  );

  if (filteredFollows.length > 0) {
    unfollowButton = <button onClick={unFollowHandler}>Unfollow</button>;
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
        {unfollowButton}
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

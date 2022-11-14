import classes from "./Post.module.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

function Post({ post }) {
  const { username, avatar_url: avatarUrl } = post.user;
  return (
    <div className={classes.post}>
      <div className={classes.userContainer}>
        <img src={avatarUrl} alt="User Avatar" />
        <p className={classes.user}>{username}</p>
        <p className={classes.date}>
          {new Date(post.created_at).toLocaleString(navigator.language)}
        </p>
      </div>
      <p className={classes.postContent}>{post.content}</p>
      <div className={classes.actions}>
        <div className={classes.likes}>
          <FavoriteOutlinedIcon />
          {post.likes.length}
        </div>
      </div>
    </div>
  );
}

export default Post;

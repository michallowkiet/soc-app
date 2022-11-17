import classes from "./DeletePostModal.module.css";

function DeletePostModal({ deletePost, showModal, postId }) {
  return (
    <div className={classes.bg}>
      <div className={classes.modal}>
        <p>Do you want to delete the post</p>
        <div className={classes.actions}>
          <button onClick={() => showModal()}>Cancel</button>
          <button onClick={() => deletePost(postId)}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostModal;

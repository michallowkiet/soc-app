import classes from "./DeletePostModal.module.css";

function DeletePostModal({ deletePost, showModal, postId }) {
  const deleteHandler = () => {
    showModal();
    deletePost(postId);
  };

  return (
    <div className={classes.bg}>
      <div className={classes.modal}>
        <p>Do you want to delete the post</p>
        <div className={classes.actions}>
          <button onClick={() => showModal(false)}>Cancel</button>
          <button onClick={deleteHandler}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostModal;

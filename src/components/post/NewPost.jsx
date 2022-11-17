import { useRef } from "react";
import classes from "./Post.module.css";
function NewPost(props) {
  const textarea = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddNewPost({
      content: textarea.current.value,
    });
    textarea.current.value = "";
  };
  return (
    <div className={classes.post}>
      <form onSubmit={submitHandler}>
        <textarea name="post" id="post" ref={textarea} />
        <button type="submit">Add post</button>
      </form>
    </div>
  );
}

export default NewPost;

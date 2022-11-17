import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/post/Post";
import classes from "./Home.module.css";
import { useOutletContext } from "react-router-dom";
import NewPost from "../../components/post/NewPost";
import FollowRecommendation from "../../components/follow/FollowRecommendation";

function Home() {
  const [recommendation, setRecommendation] = useState([]);
  const [posts, setPosts] = useState([]);
  const [, setNewPosts] = useState(null);

  const ctx = useOutletContext();
  let errorMessage;

  const getLatestPosts = async () => {
    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/latest"
    );

    if (response.status !== 200) {
      throw new Error("Coś poszło nie tak.");
    }

    const data = response.data;

    setPosts(data);
  };

  const getOlderThen = async () => {
    const [lastPost] = posts.slice(-1);

    const date = { date: lastPost.created_at };

    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/older-then",
      { date }
    );

    if (response.status !== 200) {
      throw new Error("Coś poszło nie tak.");
    }

    const data = response.data;

    setPosts(() => {
      return [...posts, ...data];
    });
  };

  const getNewerThen = async () => {
    const [firstPost] = posts.slice(1);

    const date = { date: firstPost.created_at };

    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/newer-then",
      { date }
    );

    if (response.status !== 200) {
      throw new Error("Coś poszło nie tak.");
    }

    const data = await response.data;

    setPosts(() => {
      return [data[0], ...posts];
    });
  };

  const addNewPost = async (post) => {
    try {
      const response = await axios.post(
        "https://akademia108.pl/api/social-app/post/add",
        post
      );

      const data = await response.data;
      setNewPosts(data.post);
      errorMessage = <p>{data.message}</p>;
      getNewerThen();
    } catch (error) {
      errorMessage = <p>{error.response.data.message}</p>;
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.post("https://akademia108.pl/api/social-app/post/delete", {
        post_id: postId,
      });

      const filteredPosts = posts.filter((post) => post.id !== postId);
      setPosts(filteredPosts);
    } catch (error) {
      errorMessage = <p>{error.response.data.message}</p>;
    }
  };

  const getRecommendations = async () => {
    const response = await axios.post(
      "https://akademia108.pl/api/social-app/follows/recommendations"
    );

    const data = await response.data;

    setRecommendation((prevState) => {
      return [...prevState, data];
    });
  };

  const follow = async () => {};

  const loadMoreHandler = () => {
    try {
      getOlderThen();
    } catch (error) {
      errorMessage = <p>{error.message}</p>;
    }
  };

  const deletePostHandler = (postId) => {
    deletePost(postId);
  };

  useEffect(() => {
    try {
      getLatestPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getRecommendations();
  }, [posts]);

  return (
    <section className={classes.home}>
      <div className="container">
        {errorMessage}
        {ctx.user && recommendation.length > 0 && (
          <FollowRecommendation recommendation={recommendation} />
        )}
        {ctx.user && <NewPost onAddNewPost={addNewPost} />}
        {posts.map((post) => {
          return (
            <Post key={post.id} post={post} deletePost={deletePostHandler} />
          );
        })}
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </section>
  );
}

export default Home;

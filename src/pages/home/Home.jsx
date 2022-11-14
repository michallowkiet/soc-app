import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/post/Post";
import classes from "./Home.module.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "");

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
    console.log(lastPost);
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

  const loadMoreHandler = () => {
    try {
      getOlderThen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      getLatestPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className={classes.home}>
      <div className="container">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </section>
  );
}

export default Home;

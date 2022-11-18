import { useState, useEffect } from "react";

import Post from "../../components/post/Post";
import classes from "./Home.module.css";
import { useOutletContext } from "react-router-dom";
import NewPost from "../../components/post/NewPost";
import FollowRecommendation from "../../components/follow/FollowRecommendation";
import {
  getLatestPosts,
  getOlderThen,
  getNewerThen,
  addNewPost,
  deletePost,
  getUsersRecommendation,
  follow,
  getAllFollows,
  disFollow,
} from "../../utils/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [allFollows, setAllFollows] = useState([]);

  const { user } = useOutletContext();
  let errorMessage;
  let recommendationEl;

  const getOlderPosts = async () => {
    const data = await getOlderThen(posts);

    setPosts(() => {
      return [...posts, ...data];
    });
  };

  const getNewerPosts = async () => {
    const data = await getNewerThen(posts);

    setPosts(() => {
      return [data[0], ...posts];
    });
  };

  const addPost = async (post) => {
    const data = await addNewPost(post);

    if (data?.error) {
      errorMessage = <p>{data.error.message}</p>;
      return;
    }

    getNewerPosts();
  };

  const getRecommendations = async () => {
    const data = await getUsersRecommendation();
    if (data.length > 0) {
      setRecommendation(() => {
        return [...data];
      });
    }
  };

  const getAllFollowers = async () => {
    const followers = await getAllFollows();
    if (followers && followers.length > 0) {
      setAllFollows(() => {
        return [...followers];
      });
    }
  };

  const getPosts = async () => {
    const postsData = await getLatestPosts();

    setPosts(() => {
      return [...postsData];
    });
    getRecommendations();
    getAllFollowers();
  };

  const removePost = async (postId) => {
    const data = await deletePost(postId);

    if (data?.error) {
      errorMessage = <p>{data.error.message}</p>;
      return;
    }

    getPosts();
  };

  const followHandler = async (leader_id) => {
    const data = await follow(leader_id);

    if (data) {
      return;
    }

    await getPosts();
  };

  const unFollowHandler = async (leader_id) => {
    const data = await disFollow(leader_id);

    if (data) {
      return;
    }

    await getPosts();
  };

  const loadMoreHandler = () => {
    try {
      getOlderPosts();
    } catch (error) {
      errorMessage = <p>{error.message}</p>;
    }
  };

  const deletePostHandler = (postId) => {
    removePost(postId);
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (recommendation.length > 0 && user) {
    recommendationEl = (
      <FollowRecommendation
        follow={followHandler}
        recommendation={recommendation}
      />
    );
  }

  return (
    <section className={classes.home}>
      <div className="container">
        {errorMessage}
        {recommendationEl}
        {user && <NewPost onAddNewPost={addPost} />}
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              deletePost={deletePostHandler}
              follows={allFollows}
              unFollow={unFollowHandler}
            />
          );
        })}
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </section>
  );
}

export default Home;

import axios from "axios";

export const getLatestPosts = async () => {
  try {
    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/latest"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOlderThen = async (posts) => {
  try {
    const [lastPost] = posts.slice(-1);

    const date = { date: lastPost.created_at };

    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/older-then",
      { date }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNewerThen = async (posts) => {
  try {
    const [firstPost] = posts.slice(1);

    const date = { date: firstPost.created_at };

    const response = await axios.post(
      "http://akademia108.pl/api/social-app/post/newer-then",
      { date }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addNewPost = async (post) => {
  try {
    await axios.post("https://akademia108.pl/api/social-app/post/add", post);
  } catch (error) {
    return error;
  }
};

export const deletePost = async (postId) => {
  try {
    await axios.post("https://akademia108.pl/api/social-app/post/delete", {
      post_id: postId,
    });
  } catch (error) {
    return error;
  }
};

export const getUsersRecommendation = async () => {
  try {
    const response = await axios.post(
      "https://akademia108.pl/api/social-app/follows/recommendations"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const logIn = async (formData) => {
  try {
    const response = await axios.post(
      "http://akademia108.pl/api/social-app/user/login",
      formData
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const signUp = async (formData) => {
  try {
    const response = await axios.post(
      "http://akademia108.pl/api/social-app/user/signup",
      formData
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const likeDislike = async (isLiked, id) => {
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
    return error;
  }
};

export const follow = async (leader_id) => {
  try {
    await axios.post("https://akademia108.pl/api/social-app/follows/follow", {
      leader_id,
    });
  } catch (error) {
    return error;
  }
};

export const getAllFollows = async () => {
  try {
    const response = await axios.post(
      "https://akademia108.pl/api/social-app/follows/allfollows"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const disFollow = async (leader_id) => {
  try {
    await axios.post(
      "https://akademia108.pl/api/social-app/follows/disfollow",
      { leader_id }
    );
  } catch (error) {
    return error;
  }
};

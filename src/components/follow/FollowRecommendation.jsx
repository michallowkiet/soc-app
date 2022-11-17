import classes from "./FollowRecommendation.module.css";

function FollowRecommendation({ recommendation, follow }) {
  return (
    <div className={classes.follow}>
      <h3>Recommended users to follow</h3>
      <div className={classes.users}>
        {recommendation.map((rec) => {
          return (
            <div key={rec.id} className={classes.user}>
              <img src={rec.avatar_url} alt="User Avatar" />
              <p className={classes.user}>{rec.username}</p>
              <button onClick={() => follow(rec.id)}>Follow</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FollowRecommendation;

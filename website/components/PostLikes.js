import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

const LIKE_POST_MUTATION = gql`
  mutation LikePost($slug: String!, $count: Int!) {
    likePost(slug: $slug, count: $count) {
      id
      count
      slug
    }
  }
`;

export default function PostLikes({ count = 0 }) {
  const [likes, setLikes] = useState(0);
  const [likePost] = useMutation(LIKE_POST_MUTATION);

  const sendLikes = (count) => {
    likePost({
      variables: {
        count,
        slug: global.location?.pathname,
      },
    });
  };

  const handleClick = () => {
    if (likes < 50) {
      setLikes(likes + 1);
    }
  };

  useEffect(() => {
    if (likes > 0) {
      const timeout = setTimeout(() => {
        sendLikes(likes);
        setLikes(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [likes]);

  return (
    <>
      <button onClick={handleClick}>Like Post</button> {count + likes}
    </>
  );
}

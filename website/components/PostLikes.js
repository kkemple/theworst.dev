import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useStickyState } from "@utils/hooks";
import useSound from "use-sound";

const LIKE_POST_MUTATION = gql`
  mutation LikePost($slug: String!, $count: Int!) {
    likePost(slug: $slug, count: $count) {
      id
      count
      slug
    }
  }
`;

const POST_QUERY = gql`
  query Post($slug: String!) @_live(events: [POST_LIKE]) {
    post(slug: $slug) {
      id
      count
      slug
    }
  }
`;

export default function PostLikes() {
  const slug = global.location?.pathname;

  const [previousLikes, setPreviousLikes] = useStickyState(0, `twd${slug}`);
  const [likes, setLikes] = useState(0);
  const [playHaha] = useSound("./naruto-haha.mp3", { volume: 0.3 });
  const [playThatWillDoIt] = useSound("./naruto-that-will-do-it.mp3", {
    volume: 0.3,
  });
  const [likePost] = useMutation(LIKE_POST_MUTATION);
  const { data, error } = useQuery(POST_QUERY, {
    variables: { slug },
  });

  if (error) {
    console.error(error);
  }

  const count = data?.post?.count;

  const sendLikes = (count) => {
    likePost({
      variables: {
        count,
        slug,
      },
    });
    setPreviousLikes(previousLikes + count);
  };

  const handleClick = () => {
    if (likes + previousLikes < 10) {
      setLikes(likes + 1);
    }
  };

  useEffect(() => {
    if (likes > 0) {
      const timeout = setTimeout(() => {
        sendLikes(likes);
      }, 2000);

      if (previousLikes + likes === 10) {
        playThatWillDoIt();
      } else if (previousLikes + likes === 5) {
        playHaha();
      }

      return () => clearTimeout(timeout);
    }
  }, [likes]);

  useEffect(() => {
    setLikes(0);
  }, [count]);

  const currentCount = (count || 0) + likes;

  return (
    <>
      <button onClick={handleClick}>Like Post</button>{" "}
      <span>{currentCount > 0 ? currentCount : ""}</span>
    </>
  );
}

import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useStickyState, useRandomInterval } from "@utils/hooks";
import useSound from "use-sound";
import styles from "./PostLikes.module.css";

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
  query Post($slug: String!) @_live(events: [POST_UPDATED]) {
    post(slug: $slug) {
      id
      count
      slug
    }
  }
`;

const DEFAULT_COLOR = "#ee4493";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateHeart = (color = DEFAULT_COLOR) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color: random(0, 10) < 5 ? color : "#f6a2c9",
    size: random(10, 18),
    style: {
      // Pick a random spot in the available space
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
      // Float sparkles above sibling content
      zIndex: 2,
    },
  };
};

function Heart({ color, size, style }) {
  return (
    <svg
      width={size}
      height={size}
      style={style}
      className={styles.heart}
      viewBox={`0 0 100 100`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M81.99 16.512c-11.419-5.283-26.353-.314-31.636 11.079-5.283-11.393-20.217-16.369-31.635-11.079-12.161 5.642-17.976 20.05-8.37 37.047 6.335 11.236 17.217 19.898 35.638 34.165a7.132 7.132 0 008.734 0C73.142 73.456 84.024 64.79 90.359 53.56c9.606-16.996 3.792-31.405-8.37-37.047z"
      ></path>
    </svg>
  );
}

function Hearts({ children }) {
  const [hearts, setHearts] = useState([]);

  useRandomInterval(
    () => {
      const now = Date.now();

      // Create a new sparkle
      const heart = generateHeart();

      // Clean up any "expired" hearts
      const nextHearts = hearts.filter((heart) => {
        const delta = now - heart.createdAt;
        return delta < 1000;
      });

      // Include our new heart
      nextHearts.push(heart);

      // Make it so!
      setHearts(nextHearts);
    },
    100,
    800
  );

  return (
    <span className={styles.heartsContainer}>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          color={heart.color}
          size={heart.size}
          style={heart.style}
          className={styles.svg}
        />
      ))}
      <strong className={styles.contentContainer}>{children}</strong>
    </span>
  );
}

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
      <Hearts>
        <div className={styles.countContainer}>
          <span className={styles.count}>
            {currentCount > 0 ? currentCount : ""}
          </span>
        </div>

        <button className={styles.button} onClick={handleClick}>
          show love
        </button>
      </Hearts>
    </>
  );
}

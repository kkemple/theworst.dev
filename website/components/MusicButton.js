import { useState, useEffect } from "react";
import useSound from "use-sound";
import styles from "./MusicButton.module.css";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound("/naruto-theme.mp3", {
    onend: () => {
      setIsPlaying(false);
    },
  });

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [play, stop, isPlaying]);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          setIsPlaying((isPlaying) => !isPlaying);
        }}
      >
        <img
          className={styles.image}
          src="/naruto.png"
          alt="pixel art of naruto"
        />
        <span>{`${isPlaying ? "Stop" : "Play"}  naruto theme`}</span>
      </button>
    </div>
  );
}

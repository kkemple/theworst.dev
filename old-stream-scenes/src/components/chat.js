/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { motion, AnimatePresence } from "framer-motion";
import randomcolor from "randomcolor";

import useChatMessages from "../hooks/chat-messages";

export default function Chat() {
  const messages = useChatMessages();
  const [usernameColors, setUsernameColors] = useState({});

  const getColorForName = ({ displayName, color }) => {
    if (color) {
      return color;
    }

    if (!usernameColors[displayName]) {
      const userColor = randomcolor();
      setUsernameColors({ ...usernameColors, [displayName]: userColor });
      return userColor;
    }

    return usernameColors[displayName];
  };

  return (
    <ul
      css={{
        height: "100%",
        width: "100%",
        wordBreak: "break-word",
        overflow: "hidden",
        fontSize: "1.6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textShadow: "1px 1px rgba(0, 0, 0, 0.5)",
        "& .emote": {
          marginLeft: "4px",
          marginRight: "4px",
        },
        "& .emote + .emote": {
          marginLeft: 0,
        },
      }}
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.li
            css={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "stretch",
              marginBottom: "4px",
            }}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={`${message.displayName}-${index}`}
          >
            <span
              css={{
                paddingRight: "8px",
                color: getColorForName(message),
                fontFamily: "Helvetica",
                fontWeight: "bold",
                textShadow: "1px 1px black",
                textAlign: "end",
                width: "35%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {message.displayName}
            </span>
            <span
              css={{
                display: "inline-block",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                textShadow: "1px 1px black",
                width: "65%",
              }}
            >
              <span
                css={{ color: "white", display: "flex", flexWrap: "wrap" }}
                dangerouslySetInnerHTML={{ __html: message.message }}
              />
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

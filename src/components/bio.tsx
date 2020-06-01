import React from "react";

function Bio() {
  return (
    <div className="mt-12">
      <p>
        <span
          style={{
            lineHeight: "1.75rem",
            display: "block",
            marginBottom: "5px",
          }}
        >
          Written by <strong>Kurt Kemple</strong>, who lives and works in
          Virginia Beach, VA.
        </span>

        <a href="https://twitter.com/kurtkemple">
          You should follow him on Twitter
        </a>
      </p>
    </div>
  );
}

export default Bio;

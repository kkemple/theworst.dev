import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import rangeParser from "parse-numeric-range";
import theme from "prism-react-renderer/themes/nightOwl";

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const getSummary = (meta) => {
  const RE = /{summary:\s?([\d,\w,\s]+)}/;
  if (RE.test(meta)) {
    const summary = RE.exec(meta)[1];
    return summary;
  } else {
    return false;
  }
};

export const Code = ({ codeString, language, ...props }) => {
  // const components = useMDXScope()
  const shouldHighlightLine = calculateLinesToHighlight(props.metastring);

  if (props["react-live"]) {
    return (
      <LiveProvider code={codeString} language={language} theme={theme}>
        <LiveEditor theme={theme} />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else if (props["summary"]) {
    const summary = getSummary(props.metastring);
    return (
      <details>
        <summary>{summary || "See Example"}</summary>

        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`;
                }

                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </details>
    );
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }

              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  }
};

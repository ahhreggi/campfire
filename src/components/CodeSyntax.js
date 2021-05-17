/* eslint-disable react/prop-types */
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

export default {
  code({ node, inline, className, children, ...props }) {
    console.log("children", children);
    const match = /language-(\w+)/.exec(className || "");
    console.log("match", match);
    return !inline && match ? (
      <SyntaxHighlighter
        style={okaidia}
        customStyle={{
          "backgroundColor": "#06060f",
          // "border-radius": "15px",
          "padding": "1rem",
          // "maxWidth": "50rem",
          // "overflow": "scroll",
          "display": "flex",
          "whiteSpace": "pre-wrap",
          "wordBreak": "break-all"
        }}
        // wrapLines={true}
        // wrapLongLines={true}
        language={match[1]}
        // showLineNumbers={true}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>{children}</code>
    );
  },
};
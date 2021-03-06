/* eslint-disable */

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        customStyle={{
          "backgroundColor": "#06060fb6",
          "borderRadius": "16px",
          "overflow": "hidden",
          "padding": "1rem",
          "margin": "0"
        }}
        language={match[1]}
        showLineNumbers={false}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>{children}</code>
    );
  },
};
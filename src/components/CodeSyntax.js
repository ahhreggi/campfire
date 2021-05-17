/* eslint-disable react/prop-types */
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
        language={match[1]}
        showLineNumbers={true}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>{children}</code>
    );
  },
};
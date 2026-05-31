import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import '../Components/MessageBubble.css';

function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (code) => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={msg.role === "user" ? "user-container" : "ai-container"}>
      <div className={msg.role === "user" ? "user-message" : "ai-message"}>
        {msg.role === "assistant" && (
          <button className="copy-btn" onClick={() => handleCopy(msg.content)}>
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;

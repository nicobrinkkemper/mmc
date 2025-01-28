import React from "react";

export const Html = ({ children }: { children: React.ReactNode }) => {
  if (process.env["NODE_ENV"] === "production") {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
          />
        </head>
        <body>
          <div id="root">{children}</div>
          <script type="module" src="/src/client.js"></script>
        </body>
      </html>
    );
  }
  return <>{children}</>;
};

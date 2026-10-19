"use client";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="en" style={{ background: "#0c0c0f", color: "#f5f5f5" }}>
      <body
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
          gap: "1rem",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>Something went wrong.</h1>
        <p style={{ color: "#a1a1aa", margin: 0, maxWidth: "28rem" }}>
          A critical error occurred. Please try again.
        </p>
        {error.digest ? (
          <p style={{ color: "#52525b", fontSize: "0.75rem", margin: 0 }}>Digest: {error.digest}</p>
        ) : null}
        <button
          onClick={reset}
          style={{
            background: "#c23030",
            border: "none",
            borderRadius: "0.5rem",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
            padding: "0.6rem 1.25rem",
          }}
          type="button"
        >
          Try Again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;

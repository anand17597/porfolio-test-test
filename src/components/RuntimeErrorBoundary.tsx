import * as React from "react";

type State = { error?: Error };

export class RuntimeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[RuntimeErrorBoundary]", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            padding: 24,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            background: "#fafafa",
            color: "#0f172a",
          }}
        >
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            This page hit a runtime error
          </h1>
          <p style={{ color: "#64748b", marginBottom: 16, maxWidth: 560 }}>
            React crashed while rendering. Check the console for details.
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: 13,
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
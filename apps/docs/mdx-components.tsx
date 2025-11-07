import type { MDXComponents } from "mdx/types";

// This function is required for Next.js App Router MDX integration
// It will be used automatically by Next.js when parsing MDX files

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // MDX content wrapper to add padding
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <div style={{ 
        padding: "0 2rem",
        maxWidth: "64rem", 
        margin: "0 auto",
        lineHeight: "1.7",
      }}>
        {children}
      </div>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 style={{ 
        fontSize: "2.75rem", 
        marginBottom: "1.5rem", 
        borderBottom: "1px solid var(--border)",
        paddingBottom: "0.75rem",
        fontWeight: "800",
        lineHeight: "1.2",
        color: "var(--foreground)"
      }}>{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 style={{ 
        fontSize: "2rem", 
        marginTop: "2.5rem", 
        marginBottom: "1.25rem", 
        color: "var(--primary)",
        fontWeight: "700",
        lineHeight: "1.3"
      }}>{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 style={{ 
        fontSize: "1.5rem", 
        marginTop: "2rem", 
        marginBottom: "1rem",
        fontWeight: "600",
        color: "var(--foreground)",
        lineHeight: "1.4"
      }}>{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 style={{ 
        fontSize: "1.25rem", 
        marginTop: "1.5rem", 
        marginBottom: "0.75rem",
        fontWeight: "600",
        color: "var(--foreground)",
        lineHeight: "1.4"
      }}>{children}</h4>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p style={{ 
        marginBottom: "1.25rem", 
        lineHeight: "1.7",
        color: "var(--foreground)",
        fontSize: "1.05rem",
        letterSpacing: "0.01em"
      }}>{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul style={{ 
        marginBottom: "1.5rem", 
        paddingLeft: "1.5rem",
        color: "var(--foreground)"
      }}>{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol style={{ 
        marginBottom: "1.5rem", 
        paddingLeft: "1.5rem",
        color: "var(--foreground)"
      }}>{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li style={{ 
        marginBottom: "0.75rem",
        lineHeight: "1.6"
      }}>{children}</li>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a href={href} style={{ 
        color: "var(--primary)", 
        textDecoration: "none", 
        fontWeight: "500",
        borderBottom: "1px dotted var(--primary)",
        transition: "border-bottom-color 0.3s ease, color 0.3s ease"
      }}>
        {children}
      </a>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote style={{ 
        borderLeft: "4px solid var(--primary)", 
        paddingLeft: "1.5rem", 
        margin: "2rem 0", 
        color: "#6b7280",
        fontStyle: "italic",
        position: "relative",
        background: "var(--secondary)",
        padding: "1.5rem 1.5rem 1.5rem 2rem",
        borderRadius: "0 var(--radius) var(--radius) 0",
      }}>
        {children}
      </blockquote>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code style={{ 
        backgroundColor: "var(--secondary)", 
        padding: "0.2rem 0.4rem", 
        borderRadius: "4px", 
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.9em",
        border: "1px solid var(--border)",
        whiteSpace: "nowrap",
        color: "var(--primary)",
        fontWeight: "500"
      }}>
        {children}
      </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre style={{ 
        backgroundColor: "var(--secondary)", 
        padding: "1.5rem", 
        borderRadius: "var(--radius)", 
        overflow: "auto", 
        marginBottom: "1.5rem", 
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.9rem",
        lineHeight: "1.5",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
        color: "#e83e8c"
      }}>
        {children}
      </pre>
    ),
    hr: () => (
      <hr style={{ 
        border: "none", 
        borderTop: "1px solid var(--border)", 
        margin: "3rem 0",
        width: "100%"
      }} />
    ),
    table: ({ children }: { children: React.ReactNode }) => (
      <div style={{ 
        overflowX: "auto", 
        marginBottom: "1.5rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)"
      }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "0.95rem"
        }}>
          {children}
        </table>
      </div>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
      <th style={{ 
        textAlign: "left", 
        padding: "0.75rem 1rem", 
        borderBottom: "1px solid var(--border)",
        fontWeight: "600",
        backgroundColor: "var(--secondary)"
      }}>
        {children}
      </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
      <td style={{ 
        padding: "0.75rem 1rem", 
        borderBottom: "1px solid var(--border)"
      }}>
        {children}
      </td>
    ),
    img: (props) => (
      <img
        {...props}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "var(--radius)",
          marginBottom: "1.5rem",
          border: "1px solid var(--border)"
        }}
      />
    ),
    ...components,
  };
}

import Link from "next/link";
import styles from "./page.module.css";

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.container} slide-up`}>
      <Link href="/assignments" className={styles.backLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        Back to Assignments
      </Link>
      <div className={styles.content}>
        <div style={{ padding: "0 2rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

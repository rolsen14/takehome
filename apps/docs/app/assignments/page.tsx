import fs from "fs";
import path from "path";
import Link from "next/link";
import styles from "./page.module.css";

export default function AssignmentsPage() {
  // Get MDX files from the assignments directory
  const assignmentsDirectory = path.join(process.cwd(), "app/assignments");
  const folderNames = fs
    .readdirSync(assignmentsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const assignments = folderNames
    .map((folderName) => {
      const folderPath = path.join(assignmentsDirectory, folderName);
      const files = fs.readdirSync(folderPath);
      const mdxFile = files.find((file) => file === "page.mdx");

      if (!mdxFile) return null;

      return {
        slug: folderName,
        fileName: mdxFile,
        path: `/assignments/${folderName}`,
      };
    })
    .filter((file) => file !== null);

  return (
    <div className={`${styles.container} slide-up`}>
      <div className={styles.list}>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Link
              href={assignment.path}
              key={assignment.slug}
              className={styles.card}
            >
              <h2>{assignment.slug.replace(/-/g, " ")}</h2>
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
                View this assignment
              </p>
            </Link>
          ))
        ) : (
          <div className={styles.emptyState}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"></path>
              <path d="M13 3v6h6"></path>
            </svg>
            <p>No assignments found</p>
            <p>
              Add MDX files to the assignments directory to see them listed here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

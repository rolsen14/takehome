import styles from "./loading.module.css";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loading;

import styles from "../styles/Layout.module.css";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyles}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div
          className={`right flex flex-col justify-evenly ${styles.inputStyles}`}
        >
          <div className="text-center pb-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

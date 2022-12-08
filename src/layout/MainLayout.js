import Sidebar from "components/layout/Sidebar";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx("main-layout")}>
      <Sidebar className={cx("sidebar-scoped")} />
      <div className={cx("main-page")}>{children}</div>
    </div>
  );
}

export default MainLayout;

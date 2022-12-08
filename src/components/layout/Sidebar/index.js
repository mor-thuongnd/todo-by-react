import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

function Sidebar({ className }) {
  // const
  const listMenu = [
    {
      name: "HomeView",
      label: "Trang chủ",
      path: "/",
    },
    {
      name: "TodoView",
      label: "Todos App",
      path: "/todo",
    },
  ];
  const router = useLocation();
  // data

  // computed
  const checkActiveMenu = (menu) => {
    return router.pathname === menu.path;
  };
  // methods

  return (
    <div className={`${className} ${cx("sidebar")}`}>
      <h1>Basic Exercise</h1>
      <div className={`${cx("list-menu")}`}>
        {listMenu.map((menu) => (
          <Link
            to={menu.path}
            key={menu.name}
            className={cx("menu-item", {
              active: checkActiveMenu(menu),
            })}
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

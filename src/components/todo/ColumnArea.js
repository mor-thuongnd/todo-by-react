import { COLUMN_STATE } from "constants";
import classNames from "classnames/bind";
import styles from "./ColumnArea.module.scss";
const cx = classNames.bind(styles);

function ColumnArea({ col, children, className, addMode, addNewItem }) {
  const handleClickAddBtn = () => {
    addNewItem();
  };

  return (
    <div className={`${className} ${cx("column-area")}`}>
      <div className={cx("title")}>{col.title}</div>
      <div className={cx("list-item")}>
        {children}
        {col.state === COLUMN_STATE.NEW && (
          <div className={cx("button-area")}>
            <button disabled={addMode} onClick={handleClickAddBtn}>
              Thêm mới
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnArea;

import { useState } from "react";
import { getFormatTime } from "utils/time";
import { COLUMN_STATE } from "constants";
import classNames from "classnames/bind";
import styles from "./ColumnItem.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, setTodoState, selectTodos } from "store/reducers/todo";

const cx = classNames.bind(styles);

function ColumnItem({
  item,
  addMode,
  state,
  className,
  handleSubmitBtn,
  handleCancelBtn,
}) {
  // data
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector(selectTodos);

  // computed
  const getFooterLabel = (state) => {
    switch (state) {
      case COLUMN_STATE.DONE:
        return "Hoàn thành lúc:";
      case COLUMN_STATE.CANCEL:
        return "Đã hủy lúc:";
      default:
        return "";
    }
  };
  const getLabelSubmitBtn = () => {
    return addMode ? "Lưu" : "Hoàn thành";
  };
  const getLabelCancelBtn = () => {
    return addMode ? "Hủy" : "Từ bỏ";
  };

  // methods
  const onClickSubmit = () => {
    if (addMode) {
      let id = 1;
      if (todos.length) {
        id = Math.max(...todos.map((c) => c.id)) + 1;
      }
      const newItem = {
        id,
        name,
        created_at: getFormatTime(new Date()),
        state: COLUMN_STATE.NEW,
      };
      dispatch(addTodo(newItem));
    } else {
      const data = {
        ...item,
        state: COLUMN_STATE.DONE,
        lastModified: getFormatTime(new Date()),
      };
      dispatch(setTodoState({ todoId: item.id, data }));
    }
    handleSubmitBtn(addMode);
  };
  const onClickCancel = () => {
    if (addMode) {
      handleCancelBtn(addMode);
    } else {
      const data = {
        ...item,
        state: COLUMN_STATE.CANCEL,
        lastModified: getFormatTime(new Date()),
      };
      dispatch(setTodoState({ todoId: item.id, data }));
    }
  };

  return (
    <div className={`${className} ${cx("column-item")}`}>
      {addMode ? (
        <input
          type="text"
          placeholder="Vui lòng nhập tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <div className={cx("title")}>{item.name}</div>
          <div className={cx("created")}>{item.created_at}</div>
        </>
      )}
      {state === COLUMN_STATE.NEW ? (
        <div className={cx("list-btn")}>
          <button className={cx("btn-submit")} onClick={onClickSubmit}>
            {getLabelSubmitBtn()}
          </button>
          <button className={cx("btn-cancel")} onClick={onClickCancel}>
            {getLabelCancelBtn()}
          </button>
        </div>
      ) : (
        <div
          className={cx("label-footer", {
            "text-done": item.state === COLUMN_STATE.DONE,
            "text-cancel": item.state === COLUMN_STATE.CANCEL,
          })}
        >
          <div className={cx("label")}>{getFooterLabel(state)}</div>
          <div className={cx("time")}>{item.lastModified}</div>
        </div>
      )}
    </div>
  );
}

export default ColumnItem;

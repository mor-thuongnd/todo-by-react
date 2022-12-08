import { useState } from "react";
import { getFormatTime } from "utils/time";
import { COLUMN_STATE } from "constants";
import ColumnArea from "components/todo/ColumnArea";
import ColumnItem from "components/todo/ColumnItem";
import classNames from "classnames/bind";
import styles from "./TodoView.module.scss";
const cx = classNames.bind(styles);
function TodoView() {
  // const
  const listColumn = [
    {
      title: "Mới",
      state: COLUMN_STATE.NEW,
    },
    {
      title: "Đã hoàn thành",
      state: COLUMN_STATE.DONE,
    },
    {
      title: "Đã từ bỏ",
      state: COLUMN_STATE.CANCEL,
    },
  ];

  // data
  const [addMode, setAddMode] = useState(false);
  const [todos, setTodos] = useState([]);

  // computed
  const getListItemByState = (state) => {
    return todos.filter((c) => c.state === state);
  };

  // methods
  const addNewItem = () => {
    setAddMode(true);
  };
  const handleSubmitBtn = (addMode, emitData) => {
    if (addMode) {
      setTodos((prev) => {
        let id = 1;
        if (todos.length) {
          id = Math.max(...todos.map((c) => c.id)) + 1;
        }
        const newItem = {
          id,
          name: emitData,
          created_at: getFormatTime(new Date()),
          state: COLUMN_STATE.NEW,
        };
        return [...prev, newItem];
      });
      setAddMode(false);
    } else {
      changeItemState(emitData, COLUMN_STATE.DONE);
    }
  };
  const changeItemState = (itemId, state) => {
    const idx = todos.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      let newArr = [...todos];
      newArr[idx] = {
        ...newArr[idx],
        lastModified: getFormatTime(new Date()),
        state,
      };
      setTodos(newArr);
    }
  };
  const handleCancelBtn = (addMode, emitData) => {
    if (addMode) {
      setAddMode(false);
    } else {
      changeItemState(emitData, COLUMN_STATE.CANCEL);
    }
  };

  // template
  return (
    <div className={cx("page")}>
      <div className="form-search"></div>
      {listColumn.map((col) => (
        <ColumnArea
          col={col}
          key={col.state}
          className={cx("col-area")}
          addMode={addMode}
          addNewItem={addNewItem}
        >
          {col.state === COLUMN_STATE.NEW && addMode && (
            <ColumnItem
              addMode={true}
              state={col.state}
              handleSubmitBtn={handleSubmitBtn}
              handleCancelBtn={handleCancelBtn}
            ></ColumnItem>
          )}
          {!!getListItemByState(col.state).length &&
            getListItemByState(col.state).map((item) => (
              <ColumnItem
                item={item}
                key={item.id}
                state={col.state}
                handleSubmitBtn={handleSubmitBtn}
                handleCancelBtn={handleCancelBtn}
              ></ColumnItem>
            ))}
        </ColumnArea>
      ))}
    </div>
  );
}

export default TodoView;

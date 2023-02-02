import { useState } from "react";
import { COLUMN_STATE } from "constants";
import ColumnArea from "components/todo/ColumnArea";
import ColumnItem from "components/todo/ColumnItem";
import classNames from "classnames/bind";
import styles from "./TodoView.module.scss";
import { useSelector } from "react-redux";
import { selectTodos } from "store/reducers/todo";

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
  const { todos } = useSelector(selectTodos);

  // computed
  const getListItemByState = (state) => {
    return todos.filter((c) => c.state === state);
  };

  // methods
  const addNewItem = () => {
    setAddMode(true);
  };
  const handleSubmitBtn = (addMode) => {
    if (addMode) {
      setAddMode(false);
    }
  };
  const handleCancelBtn = () => {
    setAddMode(false);
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

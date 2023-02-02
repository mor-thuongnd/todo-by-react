export const ADD_TODO = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const SET_TODO = (todoId, data) => {
  return {
    type: "SET_TODO",
    payload: { todoId, data },
  };
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = state.todos.concat([action.payload]);
    },
    setTodoState(state, action) {
      const state2 = [...state.todos];
      const idx = state2.findIndex((c) => c.id === action.payload.todoId);
      if (idx !== -1) state2[idx] = action.payload.data;
      state.todos = [...state2];
    },
  },
});
export const { addTodo, setTodoState } = todoSlice.actions;
export const selectTodos = (state) => state["todo"];
export default todoSlice.reducer;

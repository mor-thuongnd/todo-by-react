import { combineReducers } from "redux";

import todo from "./todo";

const allReducers = combineReducers({
  todo,
  // add more reducers here
});

export default allReducers;

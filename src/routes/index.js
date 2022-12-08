import HomeView from "components/views/HomeView";
import TodoView from "components/views/TodoView";

const router = [
  {
    path: "",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "todo",
    name: "TodoView",
    component: TodoView,
  },
];

export { router };

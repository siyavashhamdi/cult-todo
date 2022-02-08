/** @overridable */
import { IRoute } from "@bluelibs/x-ui";

import { SettingFilled } from "@ant-design/icons";
import { Todo } from "../Todo";

export const TODOS_LIST: IRoute = {
  path: "/todos",
  component: Todo,
  menu: {
    key: "TODO",
    label: "management.todos.menu.title",
    icon: SettingFilled,
  },
};

export const TODOS_CREATE: IRoute = {
  path: "/admin/todos/create",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

export const TODOS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/todos/:id/edit",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

export const TODOS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/todos/:id/view",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

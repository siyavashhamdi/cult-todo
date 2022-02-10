import { UserRole } from "@root/api.types";
import { IRoute } from "@bluelibs/x-ui";
import { CheckSquareOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { TodosList } from "../components/List/TodosList";
import { TodosCreate } from "../components/Create/TodosCreate";
import { TodosEdit } from "../components/Edit/TodosEdit";
import { TodosView } from "../components/View/TodosView";
import { Todo } from "../Todo";

export const USER_TODOS_LIST: IRoute = {
  path: "/user/todos",
  component: Todo,
  menu: {
    key: "TODO",
    label: "management.todos.menu.list_title",
    icon: CheckSquareOutlined,
  },
};

export const TODOS_LIST: IRoute = {
  path: "/admin/todos",
  component: TodosList,
  menu: {
    key: "TODOS_LIST",
    label: "management.todos.menu.title",
    icon: UnorderedListOutlined,
  },
  roles: [UserRole.ADMIN],
};

export const TODOS_CREATE: IRoute = {
  path: "/admin/todos/create",
  component: TodosCreate,
  roles: [UserRole.ADMIN],
};

export const TODOS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/todos/:id/edit",
  component: TodosEdit,
  roles: [UserRole.ADMIN],
};

export const TODOS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/todos/:id/view",
  component: TodosView,
  roles: [UserRole.ADMIN],
};

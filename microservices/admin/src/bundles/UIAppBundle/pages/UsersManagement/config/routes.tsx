/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import { UserOutlined } from "@ant-design/icons";
import { UserRole } from "@root/api.types";

import { UsersList } from "../components/List/UsersList";
import { UsersCreate } from "../components/Create/UsersCreate";
import { UsersEdit } from "../components/Edit/UsersEdit";
import { UsersView } from "../components/View/UsersView";

export const USERS_LIST: IRoute = {
  path: "/admin/users",
  component: UsersList,
  menu: {
    key: "USERS_LIST",
    label: "management.users.menu.title",
    icon: UserOutlined,
  },
  roles: [UserRole.ADMIN],
};

export const USERS_CREATE: IRoute = {
  path: "/admin/users/create",
  component: UsersCreate,
  roles: [UserRole.ADMIN],
};

export const USERS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/users/:id/edit",
  component: UsersEdit,
  roles: [UserRole.ADMIN],
};

export const USERS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/users/:id/view",
  component: UsersView,
  roles: [UserRole.ADMIN],
};

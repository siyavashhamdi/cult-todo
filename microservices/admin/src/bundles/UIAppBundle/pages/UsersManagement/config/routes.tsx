/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";

import { SettingFilled } from "@ant-design/icons";

export const USERS_LIST: IRoute = {
  path: "/admin/users",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

export const USERS_CREATE: IRoute = {
  path: "/admin/users/create",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

export const USERS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/users/:id/edit",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

export const USERS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/users/:id/view",
  component: () => {
    console.error("This route is not available.");
    return null;
  },
};

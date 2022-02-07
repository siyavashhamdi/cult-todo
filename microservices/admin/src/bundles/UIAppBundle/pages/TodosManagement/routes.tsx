import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  TODOS_LIST as BASE_TODOS_LIST,
  TODOS_CREATE as BASE_TODOS_CREATE,
  TODOS_EDIT as BASE_TODOS_EDIT,
  TODOS_VIEW as BASE_TODOS_VIEW,
} from "./config/routes";

export const TODOS_LIST: IRoute = {
  ...BASE_TODOS_LIST,
};

export const TODOS_CREATE: IRoute = {
  ...BASE_TODOS_CREATE,
};

export const TODOS_EDIT: IRoute = {
  ...BASE_TODOS_EDIT,
};

export const TODOS_VIEW: IRoute = {
  ...BASE_TODOS_VIEW,
};

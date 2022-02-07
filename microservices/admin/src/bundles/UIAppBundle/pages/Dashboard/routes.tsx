import { Dashboard } from "./Dashboard";
import { UnorderedListOutlined } from "@ant-design/icons";

export const DASHBOARD = {
  path: "/dashboard",
  component: Dashboard,
  menu: {
    key: "Dashboard",
    label: "Todo List",
    order: 0,
    icon: UnorderedListOutlined,
  },
};

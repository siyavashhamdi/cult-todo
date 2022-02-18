/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  Todo,
  UsersCollection,
  TodosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoList extends XList<Todo> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "createdAt",
        title: t("management.todos.fields.createdAt"),
        key: "management.todos.fields.createdAt",
        dataIndex: ["createdAt"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "date",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "updatedAt",
        title: t("management.todos.fields.updatedAt"),
        key: "management.todos.fields.updatedAt",
        dataIndex: ["updatedAt"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "date",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "title",
        title: t("management.todos.fields.title"),
        key: "management.todos.fields.title",
        dataIndex: ["title"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "isChecked",
        title: t("management.todos.fields.isChecked"),
        key: "management.todos.fields.isChecked",
        dataIndex: ["isChecked"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "position",
        title: t("management.todos.fields.position"),
        key: "management.todos.fields.position",
        dataIndex: ["position"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "number",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "createdBy",
        title: t("management.todos.fields.createdBy"),
        key: "management.todos.fields.createdBy",
        dataIndex: ["createdBy"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
    ]);
  }

  static getSortMap() {
    return {
      createdBy: "createdBy.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<Todo> {
    return {
      _id: 1,
      createdAt: 1,
      updatedAt: 1,
      title: 1,
      isChecked: 1,
      position: 1,
      createdBy: {
        _id: 1,
        fullName: 1,
      },
      createdById: 1,
    };
  }
}

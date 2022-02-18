/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  Todo,
  UsersCollection,
  TodosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoCreateForm extends XForm {
  @Inject(() => TodosCollection)
  collection: TodosCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "title",
        label: t("management.todos.fields.title"),
        name: ["title"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "isChecked",
        label: t("management.todos.fields.isChecked"),
        name: ["isChecked"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Radio.Group>
              <Ant.Radio value={false} key={0}>
                No
              </Ant.Radio>
              <Ant.Radio value={true} key={1}>
                Yes
              </Ant.Radio>
            </Ant.Radio.Group>
          </Ant.Form.Item>
        ),
      },

      {
        id: "position",
        label: t("management.todos.fields.position"),
        name: ["position"],
        required: true,
        component: Ant.InputNumber,
      },

      {
        id: "createdById",
        label: t("management.todos.fields.createdBy"),
        name: ["createdById"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }

  onSubmit(document: Partial<Todo>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.todos.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.TODOS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.TODOS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.TODOS_EDIT, {
            params: {
              id: _id,
            },
          });
        }
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}

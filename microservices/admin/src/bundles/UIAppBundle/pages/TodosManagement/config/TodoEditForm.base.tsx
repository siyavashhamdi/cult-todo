/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  Todo,
  UsersCollection,
  TodosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoEditForm extends XForm {
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
        initialValue: false,
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
        id: "createdById",
        label: t("management.todos.fields.createdBy"),
        name: ["createdById"],
        required: true,
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

  static getRequestBody(): QueryBodyType<Todo> {
    return {
      _id: 1,
      title: 1,
      isChecked: 1,
      createdBy: {
        _id: 1,
        fullName: 1,
      },
      createdById: 1,
    };
  }

  onSubmit(_id, values: Partial<Todo>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.todos.edit_confirmation"),
          icon: <SmileOutlined />,
        });
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}

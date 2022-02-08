import { Typography, Checkbox, Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

import "./todo-list.scss";
import { Collections } from "@bundles/UIAppBundle";
import { ObjectId } from "@bluelibs/ejson";

export interface ITodoListProps {
  data: Collections.Todo[];
  onDelete: (id: ObjectId) => void;
  onChange: (id: ObjectId, isChecked: boolean) => void;
}

export function TodoList({ data, onDelete, onChange }: ITodoListProps) {
  return (
    <Typography className="list-holder">
      {!data?.length ? (
        <Typography className="todo-not-found">-- No todo found! --</Typography>
      ) : (
        data.map(({ _id, title, isChecked }) => {
          return (
            <Typography key={_id}>
              <Checkbox
                checked={isChecked}
                onChange={(ev) => onChange(_id, ev.target.checked)}
              >
                <Typography
                  className={`todo-title ${
                    isChecked ? "todo-checked" : "todo-unchecked"
                  }`}
                >
                  {title}
                </Typography>
              </Checkbox>

              <Popconfirm
                className="todo-delete"
                title="Are you sure to delete?"
                placement="right"
                onConfirm={() => onDelete(_id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone />
              </Popconfirm>
            </Typography>
          );
        })
      )}
    </Typography>
  );
}

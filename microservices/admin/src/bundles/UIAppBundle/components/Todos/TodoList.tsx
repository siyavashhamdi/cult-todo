import { DragEvent, useState } from "react";
import { Typography, Checkbox, Popconfirm } from "antd";

import { DeleteTwoTone } from "@ant-design/icons";
import { Collections } from "@bundles/UIAppBundle";
import { ObjectId } from "@bluelibs/ejson";

import "./todo-list.scss";

export interface ITodoListProps {
  data: Collections.Todo[];
  onDelete: (id: ObjectId) => void;
  onChange: (id: ObjectId, isChecked: boolean) => void;
  onPositionChanged: (fromId: ObjectId, toId: ObjectId) => void;
}

export function TodoList({
  data,
  onDelete,
  onChange,
  onPositionChanged,
}: ITodoListProps) {
  const [dragFrom, setDragFrom] = useState<ObjectId>(null);
  const [dropTo, setDropTo] = useState<ObjectId>(null);

  const handleResetDragDrop = () => {
    setDragFrom(null);
    setDropTo(null);
  };

  function handleDragOver(ev: DragEvent<HTMLDivElement>, todoOverId: ObjectId) {
    setDropTo(todoOverId);
    ev.preventDefault();
  }

  return (
    <Typography className="list-holder">
      {!data?.length ? (
        <Typography className="todo-not-found">-- No todo found! --</Typography>
      ) : (
        data.map(({ _id, title, isChecked }) => {
          return (
            <div
              key={_id}
              onDragEnd={handleResetDragDrop}
              onDragOver={(ev) => handleDragOver(ev, _id)}
              onDrop={() => onPositionChanged(dragFrom, dropTo)}
            >
              <div
                draggable
                className={
                  "todo-holder" + ([dragFrom, dropTo].includes(_id) ? " active-drag-drop" : "")
                }
                onDragStart={() => setDragFrom(_id)}
              >
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
              </div>
            </div>
          );
        })
      )}
    </Typography>
  );
}

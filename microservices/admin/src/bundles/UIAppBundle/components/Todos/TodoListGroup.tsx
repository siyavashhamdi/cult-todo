import { DragEvent, useState } from "react";
import { Typography, Checkbox, Popconfirm } from "antd";

import { DeleteTwoTone } from "@ant-design/icons";
import { Collections } from "@bundles/UIAppBundle";
import { ObjectId } from "@bluelibs/ejson";
import { Todo } from "@root/api.types";

import "./todo-lists.scss";

export interface ITodoListGroupProps {
  data: Collections.Todo[];
  onDelete: (id: ObjectId) => void;
  onChange: (id: ObjectId, isChecked: boolean) => void;
  onPositionChanged: (fromId: ObjectId, toId: ObjectId) => void;
  onDroppedTodo: (fromId: Todo) => void;
}

export function TodoListGroup({
  data,
  onDelete,
  onChange,
  onPositionChanged,
  onDroppedTodo,
}: ITodoListGroupProps) {
  const [dragFrom, setDragFrom] = useState<Collections.Todo>(null);
  const [dropTo, setDropTo] = useState<Collections.Todo>(null);

  const handleResetDragDrop = () => {
    setDragFrom(null);
    setDropTo(null);
    onDroppedTodo(null);
  };

  const handleDragOver = (
    ev: DragEvent<HTMLDivElement>,
    todoOver: Collections.Todo
  ) => {
    setDropTo(todoOver);
    ev.preventDefault();
  };

  const ableToDropInSameGroup = () =>
    dragFrom && dropTo && dragFrom.isChecked === dropTo.isChecked;

  const handleDrop = () => {
    if (ableToDropInSameGroup()) {
      onPositionChanged(dragFrom._id, dropTo._id);
    }
  };

  return (
    <>
      {!data?.length ? (
        <Typography className="todo-not-found">-- No todo found! --</Typography>
      ) : (
        data.map((todo) => {
          const hasActiveDragClass = () => {
            const isMatchedTodoWithDragFrom = dragFrom?._id === todo?._id;
            const isMatchedTodoWithDropTo =
              ableToDropInSameGroup() && dropTo._id === todo._id;

            return isMatchedTodoWithDragFrom || isMatchedTodoWithDropTo;
          };

          return (
            <div
              draggable
              key={todo._id}
              className={hasActiveDragClass() ? "active-drag-drop" : ""}
              onDragEnd={handleResetDragDrop}
              onDragOver={(ev) => handleDragOver(ev, todo)}
              onDrop={() => handleDrop()}
              onDragLeave={() => setDropTo(null)}
              onDragStart={() => {
                setDragFrom(todo);
                onDroppedTodo(todo);
              }}
            >
              <Checkbox
                checked={todo.isChecked}
                onChange={(ev) => onChange(todo._id, ev.target.checked)}
              >
                <Typography
                  className={`todo-title ${
                    todo.isChecked ? "todo-checked" : "todo-unchecked"
                  }`}
                >
                  {todo.title}
                </Typography>
              </Checkbox>

              <Popconfirm
                className="todo-delete"
                title="Are you sure to delete?"
                placement="right"
                onConfirm={() => onDelete(todo._id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone />
              </Popconfirm>
            </div>
          );
        })
      )}
    </>
  );
}

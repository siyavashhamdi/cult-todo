import { useState } from "react";
import { Typography, Row, Col, Card } from "antd";

import { Collections } from "@bundles/UIAppBundle";
import { ObjectId } from "@bluelibs/ejson";
import { Todo } from "@root/api.types";

import "./todo-lists.scss";
import { TodoListGroup } from "./TodoListGroup";

export interface ITodoListsProps {
  data: Collections.Todo[];
  onDelete: (id: ObjectId) => void;
  onChange: (id: ObjectId, isChecked: boolean) => void;
  onPositionChanged: (fromId: ObjectId, toId: ObjectId) => void;
}

export function TodoLists({
  data,
  onDelete,
  onChange,
  onPositionChanged,
}: ITodoListsProps) {
  const [dragFrom, setDragFrom] = useState<Collections.Todo>(null);

  const handleDrag = (fromTodo: Todo) => {
    setDragFrom(fromTodo);
  };

  return (
    <Typography className="lists-groups">
      <Row>
        <Col span={12}>
          <Card
            className="card-group"
            title="In-Progress"
            bordered={true}
            onDrop={() => dragFrom?.isChecked && onChange(dragFrom._id, false)}
            onDragOver={(ev) => ev.preventDefault()}
          >
            <TodoListGroup
              data={data.filter((d) => !d.isChecked)}
              onChange={onChange}
              onDelete={onDelete}
              onPositionChanged={onPositionChanged}
              onDroppedTodo={handleDrag}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            className="card-group"
            title="Done"
            bordered={true}
            onDrop={() => !dragFrom?.isChecked && onChange(dragFrom._id, true)}
            onDragOver={(ev) => ev.preventDefault()}
          >
            <TodoListGroup
              data={data.filter((d) => d.isChecked)}
              onChange={onChange}
              onDelete={onDelete}
              onPositionChanged={onPositionChanged}
              onDroppedTodo={handleDrag}
            />
          </Card>
        </Col>
      </Row>
    </Typography>
  );
}

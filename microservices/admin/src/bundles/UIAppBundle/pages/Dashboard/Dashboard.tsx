import { ChangeEvent, useEffect, useState } from "react";
import { useUIComponents, use } from "@bluelibs/x-ui";
import { Collections } from "@bundles/UIAppBundle";
import { TodosCollection } from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";
import { CopyOutlined, DeleteTwoTone } from "@ant-design/icons";
import {
  PageHeader,
  Checkbox,
  Typography,
  Input,
  Button,
  message,
  Popconfirm,
} from "antd";

import "./styles.scss";

export function Dashboard() {
  const UIComponents = useUIComponents();
  const TodoCollection = use(TodosCollection);
  const [newTitle, setNewTitle] = useState("");
  const [todo, setTodo] = useState<Collections.Todo[]>([]);

  useEffect(() => {
    getAllFromCollection().then((result) => {
      setTodo(result);
    });
  }, []);

  const getAllFromCollection = async (): Promise<Collections.Todo[]> => {
    return new Promise((resolve, reject) => {
      TodoCollection.find({}, { _id: 1, title: 1, isChecked: 1, createdAt: 1 })
        .then((result) => {
          resolve(result.sort((a, b) => a.createdAt - b.createdAt));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleNewTitleChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(ev.target.value);
  };

  const handleAddNew = () => {
    const titleToAdd = newTitle.trim();

    if (titleToAdd.length === 0) {
      message.error("Title is empty!");
      return;
    }

    TodoCollection.insertOne({ title: newTitle, isChecked: false })
      .then((_resAddNotWorking) => {
        getAllFromCollection().then((result) => {
          setTodo(result);
        });

        setNewTitle("");
        message.info("New title successfully is added.");
      })
      .catch(() => {
        message.error("Error on adding new title!");
      });
  };

  const handleCheckboxChange = (id: ObjectId) => {
    const currTodo = [...todo];
    const targetTodo = currTodo.find((t) => t._id === id);

    if (targetTodo) {
      const newIsCheckedVal = !targetTodo.isChecked;

      TodoCollection.updateOne(id, { isChecked: newIsCheckedVal }).then(
        (resUpdate) => {
          if (resUpdate) {
            targetTodo.isChecked = newIsCheckedVal;
            setTodo(currTodo);
          }
        }
      );
    }
  };

  const handleTodoDelete = (id: ObjectId) => {
    TodoCollection.deleteOne(id)
      .then((resDelete) => {
        if (resDelete) {
          const newTodo = [...todo].filter((t) => t._id !== id);

          setTodo(newTodo);
          message.info("Title is deleted.");
        }
      })
      .catch(() => {
        message.error("Error on delete!");
      });
  };

  const inputHolder = () => {
    return (
      <Input.Group compact>
        <Input
          onPressEnter={handleAddNew}
          value={newTitle}
          placeholder="Todo title..."
          allowClear
          className="input-add"
          onChange={handleNewTitleChanged}
        />
        <Button type="primary" icon={<CopyOutlined />} onClick={handleAddNew} />
      </Input.Group>
    );
  };

  const TodoListHolder = () => {
    return (
      <>
        {todo.map(({ _id, title, isChecked }) => {
          return (
            <Typography key={_id}>
              <Checkbox
                checked={isChecked}
                onChange={() => handleCheckboxChange(_id)}
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
                onConfirm={() => handleTodoDelete(_id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone />
              </Popconfirm>
            </Typography>
          );
        })}
      </>
    );
  };

  return (
    <UIComponents.AdminLayout>
      <PageHeader title="TodoList" />
      <Typography className="input-holder">{inputHolder()}</Typography>
      <Typography className="list-holder">{TodoListHolder()}</Typography>
    </UIComponents.AdminLayout>
  );
}

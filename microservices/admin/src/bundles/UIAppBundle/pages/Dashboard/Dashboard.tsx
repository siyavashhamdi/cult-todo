import { useEffect, useState } from "react";
import { PageHeader, message } from "antd";
import { useUIComponents, use } from "@bluelibs/x-ui";
import { ObjectId } from "@bluelibs/ejson";
import { Collections } from "@bundles/UIAppBundle";

import { TodosCollection } from "../../collections/";
import { TodoForm, ISubmitDocument } from "../../components/Todos/TodoForm";
import { TodoList } from "../../components/Todos/TodoList";

export function Dashboard() {
  const UIComponents = useUIComponents();
  const todoCollection = use(TodosCollection);

  const [todos, setTodos] = useState<Collections.Todo[]>([]);

  useEffect(() => {
    (async () => {
      const result = await todoCollection.find(
        {},
        { _id: 1, title: 1, isChecked: 1, createdAt: 1 }
      );

      setTodos(result);
    })();
  }, []);

  const handleSubmitForm = async (document: ISubmitDocument) => {
    try {
      const allTodos = await todoCollection.insertAndGetAll(document.title);

      setTodos(allTodos);
      message.info("New title successfully is added.");
    } catch {
      message.error("Error on adding new title!");
    }
  };

  const handleChangeTodo = async (id: ObjectId, isChecked: boolean) => {
    const currTodo = [...todos];
    const targetTodo = currTodo.find((t) => t._id === id);

    if (targetTodo) {
      try {
        const resUpdate = await todoCollection.updateOne(id, { isChecked });

        if (resUpdate) {
          targetTodo.isChecked = isChecked;

          setTodos(currTodo);
        }
      } catch {
        message.error("Error on updating todo status!");
      }
    }
  };

  const handleDeleteTodo = async (id: ObjectId) => {
    try {
      const resDelete = await todoCollection.deleteOne(id);

      if (resDelete) {
        const newTodo = [...todos].filter((t) => t._id !== id);

        setTodos(newTodo);

        message.info("Todo is deleted.");
      }
    } catch {
      message.error("Error on delete!");
    }
  };

  return (
    <UIComponents.AdminLayout>
      <PageHeader title="TodoList" />
      <TodoForm onSubmit={handleSubmitForm} />
      <TodoList
        data={todos}
        onChange={handleChangeTodo}
        onDelete={handleDeleteTodo}
      />
    </UIComponents.AdminLayout>
  );
}

import { useEffect, useState } from "react";
import { PageHeader, message } from "antd";
import { cloneDeep } from "lodash";
import { useUIComponents, use } from "@bluelibs/x-ui";
import { ObjectId } from "@bluelibs/ejson";
import { Collections } from "@bundles/UIAppBundle";
import { useMutation, useQuery } from "@apollo/client";
import {
  TODOS_CREATE_MUTATION,
  TODOS_DELETE_MUTATION,
  TODOS_UPDATE_MUTATION,
} from "@bundles/UIAppBundle/mutations/todos.mutation";
import {
  EndUsersTodosCreateInput,
  EndUsersTodosUpdateInput,
  Todo,
} from "@root/api.types";
import { TODOS_READ_QUERY } from "@bundles/UIAppBundle/mutations/todos.query";

import { TodoForm, ISubmitDocument } from "../../components/Todos/TodoForm";
import { TodoList } from "../../components/Todos/TodoList";

export function Todo() {
  const UIComponents = useUIComponents();
  const [todos, setTodos] = useState<Collections.Todo[]>([]);

  const [createTodo] = useMutation<EndUsersTodosCreateInput>(
    TODOS_CREATE_MUTATION
  );

  const [updateTodo] = useMutation<EndUsersTodosUpdateInput>(
    TODOS_UPDATE_MUTATION
  );

  const [deleteTodo] = useMutation<void>(TODOS_DELETE_MUTATION);

  type ReadQueryResult = {
    TodoEndUserRead: Todo[];
  };

  const readTodo = useQuery<ReadQueryResult>(TODOS_READ_QUERY);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await readTodo.fetchMore({});
      const { TodoEndUserRead: data } = fetchedTodos.data;

      setTodos(cloneDeep(data));
    })();
  }, []);

  const handleSubmitForm = async (document: ISubmitDocument) => {
    try {
      await createTodo({
        variables: {
          input: {
            title: document.title,
          },
        },
      });

      const fetchedTodos = await readTodo.fetchMore({});
      const { TodoEndUserRead: data } = fetchedTodos.data;

      setTodos(data);

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
        const resUpdate = await updateTodo({
          variables: {
            id,
            input: {
              isChecked,
            },
          },
        });

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
      const resDelete = await deleteTodo({
        variables: {
          id,
        },
      });

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

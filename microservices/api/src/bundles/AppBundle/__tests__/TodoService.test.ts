import { ObjectId } from "mongodb";

import { container } from "../../../__tests__/ecosystem";
import { TodoService } from "../../../bundles/AppBundle/services";
import { createEndUser, createTodo } from "./utils";
import { todoInput, userInput } from "./input";

test("create", async () => {
  const { userId } = await createEndUser(userInput);
  const todo = await createTodo(todoInput, userId as ObjectId);

  expect(todo.title).toBe(todoInput.title);
  expect(todo.isChecked).toBe(false);
});

test("update", async () => {
  const { userId } = await createEndUser(userInput);
  const todoBeforeUpdate = await createTodo(todoInput, userId as ObjectId);

  const todoAfterUpdate = await container
    .get(TodoService)
    .update(
      todoBeforeUpdate._id as ObjectId,
      { isChecked: true, position: 1 },
      userId as ObjectId
    );

  expect(todoBeforeUpdate.title).toEqual(todoAfterUpdate.title);
  expect(todoAfterUpdate.isChecked).toEqual(true);
  expect(todoAfterUpdate.position).toEqual(1);
});

test("delete", async () => {
  const { userId } = await createEndUser(userInput);
  const todoBeforeDelete = await createTodo(todoInput, userId as ObjectId);

  const todoService = container.get(TodoService);

  await todoService.delete(todoBeforeDelete._id);

  const todoAfterDelete = await todoService.read(userId as ObjectId);

  expect(todoAfterDelete).toEqual([]);
});

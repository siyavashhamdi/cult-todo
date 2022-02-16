import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { IUser, UserId } from "@bluelibs/security-bundle";
import { UsersCollection } from "@bluelibs/security-mongo-bundle";
import { RegistrationInput } from "@bluelibs/x-password-bundle";

import { container } from "../../ecosystem";
import { EndUserService } from "../../../bundles/AppBundle/services/EndUser.service";
import { TodoInsertInput } from "../../../bundles/AppBundle/services/inputs/TodoInsert.input.base";
import { TodoService } from "../../../bundles/AppBundle/services";
import { Todo, TodosCollection } from "../../../bundles/AppBundle/collections";

describe("Testing todo service", () => {
  const mockUserInput = {
    email: `test-user-${randomBytes(20).toString("hex")}@bluelibs.com`,
    password: "blue1234",
    firstName: "Siya",
    lastName: "Hamdi",
  } as RegistrationInput;

  const mockTodoInput = {
    title: `Title-Todo-Test-${randomBytes(20).toString("hex")}`,
  } as TodoInsertInput;

  let usersCollection: UsersCollection<IUser>;
  let registeredUser: { userId: UserId; token: string };

  let todoService: TodoService;
  let todosCollection: TodosCollection;

  let addedTodo: Todo;

  beforeAll(async () => {
    // Register a new user to assign todo to him/her
    let endUserService: EndUserService;

    endUserService = container.get(EndUserService);
    usersCollection = container.get(UsersCollection);

    registeredUser = await endUserService.register(mockUserInput);

    todoService = container.get(TodoService);
    todosCollection = container.get(TodosCollection);
  });

  afterAll(async () => {
    await usersCollection.deleteOne({ _id: registeredUser.userId as ObjectId });
    await todoService.delete(addedTodo._id);
  });

  test("Add a new todo", async () => {
    addedTodo = await todoService.create(
      mockTodoInput,
      registeredUser.userId as ObjectId
    );

    expect(addedTodo.title).toBe(mockTodoInput.title);
    expect(addedTodo.isChecked).toBe(false);
  });

  test("Get and update the todo", async () => {
    const todoBeforeUpdate = await todoService.read(
      registeredUser.userId as ObjectId
    );

    await todoService.update(
      addedTodo._id as ObjectId,
      { isChecked: true },
      registeredUser.userId as ObjectId
    );

    expect(todoBeforeUpdate.length).toBe(1);

    const todoAfterUpdate = await todoService.update(
      todoBeforeUpdate[0]._id as ObjectId,
      { isChecked: true },
      registeredUser.userId as ObjectId
    );

    expect(todoAfterUpdate).toEqual({
      ...todoBeforeUpdate[0],
      isChecked: todoAfterUpdate.isChecked,
      updatedAt: todoAfterUpdate.updatedAt,
    });
  });

  test("Delete the todo", async () => {
    await todoService.delete(addedTodo._id);

    const todo = await todoService.read(registeredUser.userId as ObjectId);

    expect(todo.length).toBe(0);
  });
});

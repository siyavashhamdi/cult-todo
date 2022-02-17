import { ObjectId } from "mongodb";
import { RegistrationInput } from "@bluelibs/x-password-bundle";

import { todoInput, userInput } from "./input";
import { container } from "../../../__tests__/ecosystem";
import { EndUserService, TodoService } from "../services";
import { TodoInsertInput } from "../services/inputs";

export const createEndUser = async (input: RegistrationInput = userInput) =>
  container.get(EndUserService).register(input);

export const createTodo = async (
  input: TodoInsertInput = todoInput,
  userId: ObjectId
) => container.get(TodoService).create(input, userId);

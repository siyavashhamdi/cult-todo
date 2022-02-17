import { RegistrationInput } from "@bluelibs/x-password-bundle";
import { TodoInsertInput } from "../services/inputs";

export const userInput = {
  email: `test-user@bluelibs.com`,
  password: "blue1234",
  firstName: "Siya",
  lastName: "Hamdi",
} as RegistrationInput;

export const todoInput = {
  title: `Title-Todo-Test`,
} as TodoInsertInput;

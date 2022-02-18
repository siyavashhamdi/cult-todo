import "./EndUserService.test";
import "./TodoService.test";

import { container } from "../../../__tests__/ecosystem";
import { AppFixture } from "../fixtures";

beforeAll(async () => {
  return container.get(AppFixture).clean();
});

afterEach(async () => {
  return container.get(AppFixture).clean();
});

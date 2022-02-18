import { ObjectId } from "mongodb";
import { UsersCollection } from "@bluelibs/security-mongo-bundle";

import { container } from "../../../__tests__/ecosystem";
import { UserRole } from "../collections";
import { createEndUser } from "./utils";
import { userInput } from "./input";

test("register", async () => {
  const { userId } = await createEndUser(userInput);

  const foundUser = await container.get(UsersCollection).findOne({
    _id: userId as ObjectId,
  });

  expect(foundUser.roles).toStrictEqual([UserRole.END_USER]);
});

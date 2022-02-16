import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { IUser, UserId } from "@bluelibs/security-bundle";
import { UsersCollection } from "@bluelibs/security-mongo-bundle";
import { RegistrationInput } from "@bluelibs/x-password-bundle";

import { container } from "../../ecosystem";
import { EndUserService } from "../../../bundles/AppBundle/services/EndUser.service";

describe("Testing EndUser Service", () => {
  const randomNum = Math.floor(Math.random() * 10000);
  const mockUserInput = {
    email: `test-user-${randomBytes(20).toString("hex")}@bluelibs.com`,
    password: "blue1234",
    firstName: "Siya",
    lastName: "Hamdi",
  } as RegistrationInput;

  let endUserService: EndUserService;
  let usersCollection: UsersCollection<IUser>;

  let registeredUser: { userId: UserId; token: string };

  beforeAll(async () => {
    endUserService = container.get(EndUserService);
    usersCollection = container.get(UsersCollection);
  });

  afterAll(async () => {
    await usersCollection.deleteOne({ _id: registeredUser.userId as ObjectId });
  });

  test("Register a valid user", async () => {
    registeredUser = await endUserService.register(mockUserInput);

    const foundUser = await usersCollection.findOne({
      _id: registeredUser.userId as ObjectId,
    });

    expect(registeredUser.token.length).toEqual(64);
    expect(foundUser.password.emailVerificationToken.length).toEqual(32);

    expect(foundUser.roles).toEqual(["END_USER"]);
    expect(foundUser.password.email).toEqual(mockUserInput.email);
  });

  test("Register with a duplicated username", async () => {
    expect(async () => {
      const duplicatedUser = endUserService.register(mockUserInput);

      // Clean-up if the new user is created
      if (duplicatedUser) {
        usersCollection.deleteOne({
          _id: (await duplicatedUser).userId as ObjectId,
        });
      }
    }).rejects.toThrow();
  });
});

import axios from "axios";
import { ObjectId } from "mongodb";
import { IUser, UserId } from "@bluelibs/security-bundle";
import { UsernameAlreadyExistsException } from "@bluelibs/password-bundle";

import { container } from "../../../__tests__/ecosystem";
import { EndUserService } from "../services/EndUser.service";
import { UsersCollection } from "@bluelibs/security-mongo-bundle";

describe("Testing EndUser Service", () => {
  const randomNum = Math.floor(Math.random() * 10000);
  const mockUserInput = {
    email: `test-user-${randomNum}@bluelibs.com`,
    password: "blue1234",
    firstName: "Siya",
    lastName: "Hamdi",
  };

  let registeredUser: {
    userId: UserId;
    token: string;
  };

  let endUserService: EndUserService;
  let usersCollection: UsersCollection<IUser>;

  beforeEach(async () => {
    endUserService = container.get(EndUserService);
    usersCollection = container.get(UsersCollection);

    registeredUser = await endUserService.register(mockUserInput);
  });

  afterEach(async () => {
    await usersCollection.deleteOne({ _id: registeredUser.userId as ObjectId });
  });

  it("Register a valid user", async () => {
    const foundUser = await usersCollection.findOne({
      _id: registeredUser.userId as ObjectId,
    });

    expect(registeredUser.token.length).toEqual(64);
    expect(foundUser.password.emailVerificationToken.length).toEqual(32);

    expect(foundUser.roles).toEqual(["END_USER"]);
    expect(foundUser.password.email).toEqual(mockUserInput.email);
  });

  it("Register with a duplicated username", async () => {
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

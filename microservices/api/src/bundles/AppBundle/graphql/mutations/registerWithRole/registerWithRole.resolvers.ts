import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { RegistrationInput } from "@bluelibs/x-password-bundle";
import { EndUserService } from "../../../services/EndUser.service";

export default {
  Mutation: {
    registerWithRole: [
      X.ToModel(RegistrationInput),
      X.Validate(),
      X.ToService(EndUserService, "register"),
    ],
  },
} as IResolverMap;

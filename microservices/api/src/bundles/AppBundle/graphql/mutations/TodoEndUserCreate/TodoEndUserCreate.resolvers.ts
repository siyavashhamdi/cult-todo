import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosCreateInput } from "../../../services/inputs/EndUsersTodosCreate.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodoEndUserCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["END_USER"]),
      X.ToModel(EndUsersTodosCreateInput),
      X.Validate(),
      X.ToService(TodoService, "create"),
    ],
  },
} as IResolverMap;

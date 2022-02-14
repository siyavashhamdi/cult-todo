import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodoService } from "../../../services/Todo.service";

export default {
  Query: {
    TodoEndUserCount: [
      X.CheckLoggedIn(),
      X.CheckPermission(["END_USER"]),
      X.ToService(TodoService, "count", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;

import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodoEndUserDelete: [
      X.CheckLoggedIn(),
      X.CheckPermission(["END_USER"]),
      X.ToService(TodoService, "delete", (args: any, ctx: any, _ast: any) => [
        args._id,
        ctx.userId,
      ]),
    ],
  },
} as IResolverMap;

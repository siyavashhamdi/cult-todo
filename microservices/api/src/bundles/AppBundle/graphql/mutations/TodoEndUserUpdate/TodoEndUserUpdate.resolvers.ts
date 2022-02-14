import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosUpdateInput } from "../../../services/inputs/EndUsersTodosUpdate.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    TodoEndUserUpdate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["END_USER"]),
      X.ToModel(EndUsersTodosUpdateInput),
      X.Validate(),
      X.ToService(TodoService, "update", (args: any, ctx: any, _ast: any) => [
        args._id,
        args.input,
        ctx.userId,
      ]),
    ],
  },
} as IResolverMap;

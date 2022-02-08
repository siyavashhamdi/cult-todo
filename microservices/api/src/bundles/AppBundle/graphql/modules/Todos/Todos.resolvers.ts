import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { TodoInsertInput, TodoUpdateInput } from "../../../services/inputs";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";
import { UserRole } from "@bundles/AppBundle/collections";

const setFilter = async (_, _args, ctx) => {
  return {
    filters: {
      createdById: ctx.userId,
    },
  };
};

export default {
  Query: [
    [X.CheckPermission(["ADMIN", "END_USER"])],
    {
      TodosFindOne: [X.ToNovaOne(TodosCollection)],
      TodosFind: [X.ToNova(TodosCollection, setFilter)],
      TodosCount: [X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [X.CheckPermission(["ADMIN", "END_USER"])],
    {
      TodosInsertOne: [
        X.ToModel(TodoInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],
      TodosUpdateOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(TodosCollection),
        X.Secure([
          {
            match: X.Secure.Match.Roles("ADMIN"),
          },
          {
            match: X.Secure.Match.Roles("END_USER"),
            // run: [X.Secure.IsUser(TodosCollection, "createdBy", "_id")]
            // // run: X.Secure.ApplyNovaOptions({
            // //   filters:{
            // //     createdBy:
            // //   }
            // // })
            // // run: (_: any, args: any, ctx: IGraphQLContext, ast: any) => {

            // // }
          },
        ]),
        X.ToDocumentUpdateByID(TodosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(TodosCollection),
      ],
      TodosDeleteOne: [
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentDeleteByID(TodosCollection),
      ],
    },
  ],
  Subscription: {
    TodosSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(TodosCollection)],
    },
    TodosSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(TodosCollection)],
    },
  },
} as IResolverMap;

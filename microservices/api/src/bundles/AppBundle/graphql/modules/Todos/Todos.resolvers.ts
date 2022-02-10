import * as X from "@bluelibs/x-bundle";
import { IGraphQLContext, IResolverMap } from "@bluelibs/graphql-bundle";
import { TodoInsertInput, TodoUpdateInput } from "../../../services/inputs";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";

const AddModifySecurityFilters = X.Secure([
  {
    match: X.Secure.Match.Roles("ADMIN"),
  },
  {
    match: X.Secure.Match.Roles("END_USER"),
    run: [X.Secure.IsUser(TodosCollection, "createdById", "_id")],
  },
]);

export default {
  Query: [
    [
      X.Secure([
        {
          match: X.Secure.Match.Roles("ADMIN"),
        },
        {
          match: X.Secure.Match.Roles("END_USER"),
          run: [
            X.Secure.ApplyNovaOptions((_, _args, ctx: any, _ast) => {
              const { userId } = ctx;
              const options = { filters: { createdById: userId } };

              return options;
            }),
          ],
        },
      ]),
    ],
    {
      TodosFindOne: [X.ToNovaOne(TodosCollection)],
      TodosFind: [X.ToNova(TodosCollection)],
      TodosCount: [X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      TodosInsertOne: [
        X.Secure([
          {
            match: X.Secure.Match.Roles(["ADMIN", "END_USER"]),
          },
        ]),
        X.ToModel(TodoInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],

      TodosUpdateOne: [
        AddModifySecurityFilters,
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentUpdateByID(TodosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(TodosCollection),
      ],

      TodosDeleteOne: [
        AddModifySecurityFilters,
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

import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { TodoInsertInput, TodoUpdateInput } from "../../../services/inputs";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";

const setFilter = async (_, _args, ctx) => {
  return {
    filters: {
      createdById: ctx.userId,
    },
  };
};

export default {
  Query: [
    [X.CheckPermission("TODOER")],
    {
      // TodosFindOne: [X.ToNovaOne(TodosCollection)],
      TodosFind: [X.ToNova(TodosCollection, setFilter)],
      // TodosCount: [X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [X.CheckPermission("TODOER")],
    {
      TodosInsertOne: [
        X.ToModel(TodoInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(TodosCollection),
        X.ToNovaByResultID(TodosCollection, setFilter),
      ],
      TodosUpdateOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentUpdateByID(TodosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(TodosCollection, setFilter),
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

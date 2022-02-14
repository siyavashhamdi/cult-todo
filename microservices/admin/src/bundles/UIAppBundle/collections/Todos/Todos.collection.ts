import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { Todo } from "@root/api.types";
import { UsersCollection } from "@bundles/UIAppBundle/collections";
export type { Todo };

export class TodosCollection extends Collection<Todo> {
  getName() {
    return "Todos";
  }

  getInputs() {
    return {
      insert: "TodoInsertInput!",
      update: "TodoUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<Todo>[] {
    return [
      {
        collection: () => UsersCollection,
        name: "createdBy",
        field: "createdById",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<Todo> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}

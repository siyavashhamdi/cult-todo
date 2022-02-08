import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { Todo } from "@root/api.types";
import {} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

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
    return [];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<Todo> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }

  async insertAndGetAll(title: string) {
    await this.insertOne({ title });

    return this.find({}, { _id: 1, title: 1, isChecked: 1, createdAt: 1 });
  }
}

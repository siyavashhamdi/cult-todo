import { collection, field, relation, shortcuts } from "../utils";

export const Todos = collection({
  id: "Todos",
  ui: {
    icon: "UnorderedListOutlined",
  },
  behaviors: {
    timestampable: true,
    softdeletable: true,
    blameable: true,
  },
  fields: [
    ...shortcuts.fields.timestampable(),
    shortcuts.field.softdeletable(),

    field.string("title", { isRequired: true }),
    field.boolean("isChecked", { isRequired: true }),
    field.integer("position", { isRequired: true }),
  ],
  relations: [
    relation({
      id: "createdBy",
      to: "Users",
      isRequired: false,
    }),
  ],
});

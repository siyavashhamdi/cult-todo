import { collection, field, shortcuts } from "../utils";

export const Todos = collection({
  id: "Todos",
  ui: {
    list: false,
    edit: false,
    create: false,
    view: false,
    delete: false,
    listFilters: false,
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
    field.boolean("isChecked", { isRequired: false, defaultValue: false }),
  ],
  relations: [],
});

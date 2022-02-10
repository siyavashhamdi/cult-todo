import { collection, field, shortcuts } from "../utils";

export const Users = collection({
  id: "Users",
  ui: {
    icon: "UserOutlined",
  },
  representedBy: "fullName",
  behaviors: {
    softdeletable: true,
  },
  mock: {
    count: 10,
  },
  fields: [
    // Standard fields present for user (isEnabled, createdAt)
    ...shortcuts.fields.user.standard(),
    // Information about password storage (hash, email, etc)
    shortcuts.field.user.password(),
    shortcuts.field.softdeletable(),
    ...shortcuts.fields.timestampable(),
    field({
      id: "roles",
      type: field.types.ENUM,
      enumValues: ["ADMIN", "END_USER"],
      isArray: true,
    }),
    field({
      id: "fullName",
      type: field.types.STRING,
      isReducer: true,
    }),
    field({
      id: "email",
      type: field.types.STRING,
    }),
  ],
  relations: [...shortcuts.relations.blameable()],
});

export default /* GraphQL */ `
  input TodoInsertInput {
    createdById: ObjectId
    isChecked: Boolean!
    position: Int!
    title: String!
  }
`;

export default /* GraphQL */ `
  input TodoInsertInput {
    createdById: ObjectId
    isChecked: Boolean
    title: String!
  }
`;

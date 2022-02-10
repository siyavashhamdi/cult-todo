export default /* GraphQL */ `
  input TodoUpdateInput {
    createdById: ObjectId
    isChecked: Boolean
    title: String
  }
`;

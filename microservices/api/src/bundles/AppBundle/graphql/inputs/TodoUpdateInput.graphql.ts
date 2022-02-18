export default /* GraphQL */ `
  input TodoUpdateInput {
    createdById: ObjectId
    isChecked: Boolean
    position: Int
    title: String
  }
`;

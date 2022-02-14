export default /* GraphQL */ `
  type Mutation {
    TodoEndUserUpdate(_id: ObjectId!, input: EndUsersTodosUpdateInput!): Todo!
  }
`;

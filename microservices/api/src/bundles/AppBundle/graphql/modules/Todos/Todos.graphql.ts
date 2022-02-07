export default /* GraphQL */ `
  type Query {
    TodosFindOne(query: QueryInput): Todo
    TodosFindOneByID(_id: ObjectId!): Todo
    TodosFind(query: QueryInput): [Todo]!
    TodosCount(query: QueryInput): Int!
  }

  type Mutation {
    TodosInsertOne(document: TodoInsertInput!): Todo
    TodosUpdateOne(_id: ObjectId!, document: TodoUpdateInput!): Todo!
    TodosDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    TodosSubscription(body: EJSON): SubscriptionEvent
    TodosSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;

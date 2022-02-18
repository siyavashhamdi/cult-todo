export default /* GraphQL */ `
  type Todo {
    _id: ObjectId

    """
    Represents the date when this object was created
    """
    createdAt: Date!
    createdBy: User
    createdById: ObjectId
    isChecked: Boolean!
    position: Int!
    title: String!

    """
    Represents the last time when the object was updated
    """
    updatedAt: Date!
  }
`;

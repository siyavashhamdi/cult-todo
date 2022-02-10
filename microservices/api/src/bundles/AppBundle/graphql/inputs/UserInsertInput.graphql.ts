export default /* GraphQL */ `
  input UserInsertInput {
    email: String!
    isEnabled: Boolean!
    profile: UserProfileInput!
    roles: [UserRole]!
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
